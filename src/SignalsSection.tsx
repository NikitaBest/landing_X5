import './SignalsSection.css'

function SignalsSection() {
  return (
    <section className="signals" id="signals">
      <div className="section signals__inner">
        <div className="signals__media">
          <img
            src="/bloc5.png"
            alt="Сканирование микросигналов лица"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="signals__content">
          <div className="signals__intro">
            <h2>
              ИИ видит то, что
              <br />
              <span>не видит глаз</span>
            </h2>

            <p className="signals__lead">
            Камера считывает микросигналы и отражение света от поверхности кожи лица, фиксирует колебания и свойства крови в сосудах - метод фотоплетизмографии (rPPG). Далее ИИ анализирует эти микросигналы и превращает их в данные о состоянии вашего здоровья.
            </p>
          </div>

          <div className="signals__list">
            <article className="signals__item">
              <span className="signals__icon" aria-hidden="true">
                <img src="/bloc5-1.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <div>
                <h3>Научно подтверждённый метод</h3>
                <p>
                Метод фотоплетизмографии, применяемый в медицине и носимых устройствах ("умные" часы, кольца и браслеты), теперь работает через камеру смартфона
                </p>
              </div>
            </article>

            <article className="signals__item">
              <span className="signals__icon" aria-hidden="true">
                <img src="/bloc5-2.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <div>
                <h3>Персонализация</h3>
                <p>
                Алгоритм анализирует и строит модель  профиля и состояния именно вашего организма, а не выдаёт одинаковые советы всем
                </p>
              </div>
            </article>

            <article className="signals__item">
              <span className="signals__icon" aria-hidden="true">
                <img src="/bloc5-3.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <div>
                <h3>Рекомендации ≠ диагноз</h3>
                <p>
                Вы получаете индивидуальные рекомендации по питанию на основе состояния организма, но без медицинского заключения и установления диагноза
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignalsSection
