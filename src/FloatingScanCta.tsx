import { useCallback, useEffect, useState } from 'react'
import Button from './Button'
import './FloatingScanCta.css'

/** Нижний край видимой области страницы (для mobile — visualViewport, меньше ложных срабатываний). */
function getViewportDocumentBottom(): number {
  const scrollY = window.scrollY
  const vv = window.visualViewport
  if (vv) {
    return scrollY + vv.height
  }

  return scrollY + window.innerHeight
}

function elementDocumentTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY
}

type FloatingScanCtaProps = {
  onOpenScan: () => void
  isScanModalOpen: boolean
}

const MIN_INTO_TECH_PX = 96

function FloatingScanCta({ onOpenScan, isScanModalOpen }: FloatingScanCtaProps) {
  const [isVisible, setIsVisible] = useState(false)

  const updateVisibility = useCallback(() => {
    if (isScanModalOpen) {
      setIsVisible(false)
      return
    }

    const tech = document.getElementById('tech')
    const finalCta = document.getElementById('final-cta')
    if (!tech || !finalCta) {
      setIsVisible(false)
      return
    }

    const viewBottom = getViewportDocumentBottom()
    const techTop = elementDocumentTop(tech)
    const finalCtaTop = elementDocumentTop(finalCta)

    // Не используем «final-cta в viewport по rect»: на высоком экране финальный блок
    // виден одновременно со 2-м — кнопка гасла на середине #tech. Сравниваем только
    // нижнюю границу прокрутки с Y-координатами секций в документе.
    const pastStartOfSecondBlock = viewBottom >= techTop + MIN_INTO_TECH_PX
    const beforeStartOfFinalCta = viewBottom < finalCtaTop

    setIsVisible(pastStartOfSecondBlock && beforeStartOfFinalCta)
  }, [isScanModalOpen])

  useEffect(() => {
    let raf = 0
    const scheduleUpdate = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        updateVisibility()
      })
    }

    updateVisibility()

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.visualViewport?.addEventListener('resize', scheduleUpdate)
    window.visualViewport?.addEventListener('scroll', scheduleUpdate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.visualViewport?.removeEventListener('resize', scheduleUpdate)
      window.visualViewport?.removeEventListener('scroll', scheduleUpdate)
    }
  }, [updateVisibility])

  return (
    <div
      className={`floating-scan-cta ${isVisible ? 'floating-scan-cta--visible' : ''}`}
      aria-hidden={!isVisible}
    >
      <div className="floating-scan-cta__backdrop" aria-hidden="true" />
      <div className="floating-scan-cta__inner">
        <Button
          type="button"
          variant="primary"
          className="floating-scan-cta__button"
          onClick={onOpenScan}
          startIcon={<img src="/Iconscan.svg" alt="" aria-hidden="true" />}
        >
          Пройти чекап
        </Button>
      </div>
    </div>
  )
}

export default FloatingScanCta
