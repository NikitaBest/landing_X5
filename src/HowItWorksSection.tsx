import { useEffect, useState } from 'react'
import './HowItWorksSection.css'

function HowItWorksSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  useEffect(() => {
    if (!isVideoOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVideoOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isVideoOpen])

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section how-it-works__inner">
        <h2 className="how-it-works__title">Посмотрите, как это работает</h2>

        <div className="how-it-works__steps" aria-label="Этапы процесса">
          <span className="how-it-works__chip">
            <img src="/bloc4-1.svg" alt="" aria-hidden="true" />
            Чекап здоровья
          </span>
          <span className="how-it-works__arrow" aria-hidden="true">
            <img src="/strl2.svg" alt="" />
          </span>
          <span className="how-it-works__chip">
            <img src="/bloc4-2.svg" alt="" aria-hidden="true" />
            <span className="how-it-works__chip-text how-it-works__chip-text--full">
              Показатели организма
            </span>
            <span className="how-it-works__chip-text how-it-works__chip-text--short">
              Показатели
            </span>
          </span>
          <span className="how-it-works__arrow" aria-hidden="true">
            <img src="/strl2.svg" alt="" />
          </span>
          <span className="how-it-works__chip">
            <img src="/bloc4-3.svg" alt="" aria-hidden="true" />
            Рацион питания
          </span>
        </div>

        <button
          className="how-it-works__video"
          type="button"
          aria-label="Смотреть видео"
          onClick={() => setIsVideoOpen(true)}
        >
          <span className="how-it-works__play" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="presentation" focusable="false">
              <path d="M16 11 L36 24 L16 37 Z" />
            </svg>
          </span>
        </button>

        <div className="how-it-works__meta">
          <span>60 сек</span>
          <span>Без регистрации</span>
          <span>Полная конфиденциальность</span>
        </div>
      </div>

      {isVideoOpen ? (
        <div
          className="how-it-works__modal"
          role="dialog"
          aria-modal="true"
          aria-label="Видео: как это работает"
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="how-it-works__modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="how-it-works__modal-header">
              <button
                className="how-it-works__modal-close"
                type="button"
                aria-label="Закрыть видео"
                onClick={() => setIsVideoOpen(false)}
              >
                ✕
              </button>
            </div>

            <button
              className="how-it-works__modal-close how-it-works__modal-close--floating"
              type="button"
              aria-label="Закрыть видео"
              onClick={() => setIsVideoOpen(false)}
            >
              ✕
            </button>
            <div className="how-it-works__modal-body">
              <video className="how-it-works__modal-video" src="/video.mov" controls autoPlay playsInline />
            </div>

            <div className="how-it-works__modal-footer">
              <button
                className="how-it-works__modal-footer-close"
                type="button"
                aria-label="Закрыть видео"
                onClick={() => setIsVideoOpen(false)}
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default HowItWorksSection
