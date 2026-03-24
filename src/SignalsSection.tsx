import './SignalsSection.css'

function SignalsSection() {
  return (
    <section className="signals" id="signals">
      <div className="section signals__inner">
        <div className="signals__media">
          <img src="/bloc5.png" alt="Сканирование микросигналов лица" />
        </div>

        <div className="signals__content">
          <div className="signals__intro">
            <h2>
              ИИ видит то, что
              <br />
              <span>не видит глаз</span>
            </h2>

            <p className="signals__lead">
              Камера считывает микросигналы кровотока и превращает их в данные о вашем состоянии
              с помощью ИИ и фотоплетизмографии (rPPG)
            </p>
          </div>

          <div className="signals__list">
            <article className="signals__item">
              <span className="signals__icon" aria-hidden="true">
                <img src="/bloc5-1.svg" alt="" />
              </span>
              <div>
                <h3>Научно подтверждённый метод</h3>
                <p>
                  Метод анализа кровотока, применяемый в медицине и носимых устройствах, теперь
                  работает через камеру смартфона
                </p>
              </div>
            </article>

            <article className="signals__item">
              <span className="signals__icon" aria-hidden="true">
                <img src="/bloc5-2.svg" alt="" />
              </span>
              <div>
                <h3>Персонализация</h3>
                <p>
                  Алгоритм анализирует и строит модель профиля именно вашего организма, а не
                  выдаёт одинаковые советы всем.
                </p>
              </div>
            </article>

            <article className="signals__item">
              <span className="signals__icon" aria-hidden="true">
                <img src="/bloc5-3.svg" alt="" />
              </span>
              <div>
                <h3>Рекомендации ≠ диагноз</h3>
                <p>
                  Вы получаете рекомендации по питанию на основе состояния, без медицинских
                  заключений
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
