import Button from './Button'
import './FinalCtaSection.css'

type FinalCtaSectionProps = {
  onOpenScanModal: () => void
}

function FinalCtaSection({ onOpenScanModal }: FinalCtaSectionProps) {
  return (
    <section className="final-cta" id="final-cta">
      <div className="section final-cta__inner">
        <img className="final-cta__berry" src="/Frame 2147236741.png" alt="" aria-hidden="true" />
        <img className="final-cta__seeds" src="/Semkibloc3.png" alt="" aria-hidden="true" />
        <img className="final-cta__avocado" src="/bloc3-2.png" alt="" aria-hidden="true" />

        <h2 className="final-cta__title">
          Пройдите сканирование и получите
          <br />
          <span>персональный рацион</span>
        </h2>

        <p className="final-cta__subtitle">Вы уже знаете как это работает. Осталось попробовать.</p>

        <Button
          className="final-cta__button"
          startIcon={<img src="/Iconscan.svg" alt="" aria-hidden="true" />}
          type="button"
          onClick={onOpenScanModal}
        >
          Пройти сканирование
        </Button>

        <div className="final-cta__meta">
          <span>60 сек</span>
          <span>Только на мобильном устройстве</span>
          <span>Без регистрации</span>
        </div>
      </div>
    </section>
  )
}

export default FinalCtaSection
