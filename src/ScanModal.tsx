import { useCallback, useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import './ScanModal.css'
import { buildScanAppUrl } from './scanAppUrl'
import { readStoredAuthId } from './authSession'

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
  const [qrDataUrl, setQrDataUrl] = useState<string>('/qrcode.png')
  const noticeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scanAppUrl = buildScanAppUrl(readStoredAuthId())

  const handleCopyLink = useCallback(async () => {
    await copyTextToClipboard(scanAppUrl)
    if (noticeTimeoutRef.current) {
      clearTimeout(noticeTimeoutRef.current)
    }
    setCopyNotice(true)
    noticeTimeoutRef.current = setTimeout(() => {
      setCopyNotice(false)
      noticeTimeoutRef.current = null
    }, 2600)
  }, [scanAppUrl])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    let isDisposed = false
    void QRCode.toDataURL(scanAppUrl, {
      width: 212,
      margin: 1,
      color: {
        dark: '#22352e',
        light: '#ffffff',
      },
    })
      .then((dataUrl) => {
        if (!isDisposed) {
          setQrDataUrl(dataUrl)
        }
      })
      .catch(() => {
        if (!isDisposed) {
          setQrDataUrl('/qrcode.png')
        }
      })

    return () => {
      isDisposed = true
    }
  }, [isOpen, scanAppUrl])

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
            src={qrDataUrl}
            alt="QR-код для открытия NutriScan на телефоне"
            loading="lazy"
            decoding="async"
          />
        </div>

        <button
          className="scan-modal__send"
          type="button"
          onClick={() => {
            void handleCopyLink()
          }}
        >
          <img src="/tele.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" />
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
