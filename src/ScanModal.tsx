import { useCallback, useRef, useState } from 'react'
import './ScanModal.css'
import { SCAN_APP_URL } from './scanAppUrl'

type ScanModalProps = {
  isOpen: boolean
  onClose: () => void
}

async function copyTextToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    return
  } catch {
    // fallback (HTTP, старые браузеры)
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  textarea.setAttribute('readonly', '')
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

function ScanModal({ isOpen, onClose }: ScanModalProps) {
  const [copyNotice, setCopyNotice] = useState(false)
  const noticeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopyLink = useCallback(async () => {
    await copyTextToClipboard(SCAN_APP_URL)
    if (noticeTimeoutRef.current) {
      clearTimeout(noticeTimeoutRef.current)
    }
    setCopyNotice(true)
    noticeTimeoutRef.current = setTimeout(() => {
      setCopyNotice(false)
      noticeTimeoutRef.current = null
    }, 2600)
  }, [])

  if (!isOpen) {
    return null
  }

  return (
    <div className="scan-modal" role="dialog" aria-modal="true" aria-label="Сканирование">
      <div className="scan-modal__backdrop" onClick={onClose} />
      <div className="scan-modal__card">
        <button className="scan-modal__close" type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </button>

        <h3 className="scan-modal__title">
          Сканирование доступно
          <br />
          ТОЛЬКО на смартфонах
        </h3>
        <p className="scan-modal__subtitle">Отсканируйте QR-код камерой телефона</p>

        <div className="scan-modal__qr-wrap">
          <img
            className="scan-modal__qr"
            src="/qrcode.png"
            alt="QR-код для открытия NutriScan на телефоне"
          />
        </div>

        <button
          className="scan-modal__send"
          type="button"
          onClick={() => {
            void handleCopyLink()
          }}
        >
          <img src="/tele.svg" alt="" aria-hidden="true" />
          Отправить ссылку
        </button>

        <div className="scan-modal__notice-wrap" aria-live="polite" aria-atomic="true">
          {copyNotice ? <p className="scan-modal__notice">Ссылка скопирована</p> : null}
        </div>

        <button className="scan-modal__text-close" type="button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default ScanModal
