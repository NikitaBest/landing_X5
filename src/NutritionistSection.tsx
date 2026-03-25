import './NutritionistSection.css'

function NutritionistSection() {
  return (
    <section className="nutritionist" id="nutritionist">
      <div className="section nutritionist__inner">
        <div className="nutritionist__content">
          <h2 className="nutritionist__title">
            <span className="nutritionist__title-line">ИИ-алгоритмы, обученные</span>{' '}
            <span className="nutritionist__title-accent">нутрициологом</span>
          </h2>

          <p className="nutritionist__subtitle">
            В основе подбора питания лежит продвинутая LLM-модель. Мы обучили нейросеть на огромном
            массиве данных о состоянии здоровья человека, чтобы она анализировала ваши биомаркеры с
            точностью консилиума врачей-нутрициологов.
          </p>

          <figure className="nutritionist__quote" aria-label="Цитата специалиста">
            <img className="nutritionist__quote-mark" src="/gridicons_quote.svg" alt="" aria-hidden="true" />

            <blockquote className="nutritionist__quote-text">
              Моя задача — гарантировать, что алгоритмы интерпретируют ваши результаты сканирования с
              высокой точностью, и учитывает миллионы связей в организме, создавая на 100% ваш личный
              рацион.
            </blockquote>

            <figcaption className="nutritionist__person">
              <img className="nutritionist__avatar" src="/fotn.png" alt="" aria-hidden="true" />
              <div className="nutritionist__person-meta">
                <div className="nutritionist__person-name">Наталья Кузнецова</div>
                <div className="nutritionist__person-role">Клинический нутрициолог,</div>
                <div className="nutritionist__person-role nutritionist__person-role--accent">
                  медицинский дизайнер ИИ-модели
                </div>
              </div>
            </figcaption>
          </figure>
        </div>

        <div className="nutritionist__media" aria-hidden="true">
          <img className="nutritionist__mobile-image" src="/mobii.png" alt="" />

          <img className="nutritionist__badge nutritionist__badge--behind-left-bottom" src="/blocii-3.png" alt="" />
          <img className="nutritionist__image" src="/fotnutr.png" alt="" />
          <img className="nutritionist__badge nutritionist__badge--left" src="/blocii-2.png" alt="" />
          <img className="nutritionist__badge nutritionist__badge--right" src="/blocii-1.png" alt="" />
        </div>
      </div>
    </section>
  )
}

export default NutritionistSection

