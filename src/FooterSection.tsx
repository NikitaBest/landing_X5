import './FooterSection.css'

function FooterSection() {
  return (
    <footer className="footer">
      <div className="section footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-row">
              <span className="footer__logo" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="7" fill="#37A145" />
                  <path
                    d="M8 13.5C8 10.74 10.24 8.5 13 8.5H16.2C15.88 11.76 13.16 14.3 9.86 14.3H8V13.5Z"
                    stroke="#E9F7EC"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="footer__name">NutriScan</span>
            </div>
            <p>Персональный рацион на основе ИИ-анализа вашего организма.</p>
          </div>

          <nav className="footer__col" aria-label="Навигация">
            <h3>Навигация</h3>
            <a href="#how-it-works">Как работает</a>
            <a href="#nutritionist">Технология</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="footer__col">
            <h3>Документы</h3>
            <a href="#privacy">Политика конфиденциальности</a>
            <a href="#terms">Условия использования</a>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading-as-link">
              <a href="https://mobilemed.ai/" target="_blank" rel="noreferrer">
                MobileMed.AI
              </a>
            </h3>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 NutriScan. ИИ. Все права защищены.</span>
          <span>
            Nutriscan, разработанный на технологии{' '}
            <a href="https://mobilemed.ai/" target="_blank" rel="noreferrer">
              MobileMed.AI
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
