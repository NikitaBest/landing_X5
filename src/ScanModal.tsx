import './ScanModal.css'

type ScanModalProps = {
  isOpen: boolean
  onClose: () => void
}

function ScanModal({ isOpen, onClose }: ScanModalProps) {
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
          на мобильных устройствах
        </h3>
        <p className="scan-modal__subtitle">Отсканируйте QR-код камерой телефона</p>

        <div className="scan-modal__qr-wrap">
          <img
            className="scan-modal__qr"
            src="https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=https%3A%2F%2Fnutriscan.app"
            alt="QR-код для открытия NutriScan на телефоне"
          />
        </div>

        <button className="scan-modal__send" type="button">
          <img src="/tele.svg" alt="" aria-hidden="true" />
          Отправить ссылку
        </button>

        <button className="scan-modal__text-close" type="button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default ScanModal
