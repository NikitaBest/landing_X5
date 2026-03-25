import './HowItWorksSection.css'

function HowItWorksSection() {
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

        <button className="how-it-works__video" type="button" aria-label="Смотреть видео">
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
    </section>
  )
}

export default HowItWorksSection
