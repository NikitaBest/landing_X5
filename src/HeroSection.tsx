import { useState } from 'react'
import Button from './Button'
import './HeroSection.css'

type HeroSectionProps = {
  onOpenScanModal: () => void
  onOpenScanModalWeb: () => void
}

function HeroSection({ onOpenScanModal, onOpenScanModalWeb }: HeroSectionProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className={`topbar ${isMobileMenuOpen ? 'topbar--menu-open' : ''}`}>
        <div className="section topbar__inner">
          <div className="brand">
            <img className="brand-icon" src="/iconlogj.svg" alt="Логотип NutriScan" />
            <span className="brand-name">NutriScan</span>
          </div>
          <nav className="menu" aria-label="Главное меню">
            <a href="#how-it-works">Как работает</a>
            <a href="#signals">Технология</a>
            <a href="#faq">FAQ</a>
            <Button className="menu-scan-button" type="button" onClick={onOpenScanModalWeb}>
              Пройти чекап
            </Button>
          </nav>
          <button
            className="mobile-menu-toggle"
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div className="mobile-menu" id="mobile-menu">
          <nav className="mobile-menu-nav" aria-label="Мобильное меню">
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>
              Как работает
            </a>
            <a href="#signals" onClick={() => setIsMobileMenuOpen(false)}>
              Технология
            </a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>
              FAQ
            </a>
            <Button
              className="mobile-menu-cta"
              type="button"
              onClick={onOpenScanModal}
              startIcon={<img src="/Iconscan.svg" alt="" aria-hidden="true" />}
            >
              Пройти сканирование
            </Button>
          </nav>
        </div>
      ) : null}

      <main className="section hero" id="how">
        <div className="hero-content">
          <h1>
            <span className="text-accent">Индивидуальный рацион</span>
            <br />
            с помощью ИИ
          </h1>
          <p className="lead">
            60-секундное селфи-видео{' '}
            <br className="lead-break" />
            анализирует состояние организма, ваши цели и подбирает{' '}
            <br className="lead-break" />
            персональный рацион питания
          </p>
          <div className="hero-tags">
            <span className="hero-tag">
              <img src="/60.svg" alt="" aria-hidden="true" />
              20+ показателей здоровья
            </span>
            <span className="hero-tag">
              <img src="/fon.svg" alt="" aria-hidden="true" />
              Без установки приложения
            </span>
          </div>
          <div className="actions">
            <Button
              className="hero-scan-button"
              type="button"
              onClick={onOpenScanModal}
              startIcon={<img src="/Iconscan.svg" alt="" aria-hidden="true" />}
            >
              Пройти чекап
            </Button>
            <Button
              variant="secondary"
              className="hero-how-button"
              type="button"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
              }}
              startIcon={<img src="/Iconcac.svg" alt="" aria-hidden="true" />}
            >
              Как это работает
            </Button>
          </div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-visual">
            <aside className="hero-bp-card" aria-hidden="true">
              <div className="hero-bp-card__header">
                <span className="hero-bp-card__icon">
                  <img src="/dav.svg" alt="" className="hero-bp-card__icon-img" aria-hidden />
                </span>
                <span className="hero-bp-card__label">Давление</span>
              </div>
              <div className="hero-bp-card__value">145/95</div>
              <div className="hero-bp-card__badge">Повышено</div>
            </aside>
            <div className="hero-phone">
              <img src="/iPhone.png" alt="" className="hero-phone__frame" aria-hidden />
              <div className="hero-phone__screen">
                <video
                  className="hero-phone__video"
                  src="/IMG_5365.MP4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-label="Демонстрация интерфейса NutriScan в приложении"
                />
              </div>
            </div>
            <aside className="hero-nutrition-card" aria-hidden="true">
              <div className="hero-nutrition-card__title">Пищевая ценность</div>
              <div className="hero-nutrition-card__calories">
                <span className="hero-nutrition-card__calories-value">280</span>
                <span className="hero-nutrition-card__calories-unit"> ккал</span>
              </div>
              <div className="hero-nutrition-card__bar" role="presentation">
                <span className="hero-nutrition-card__bar-seg hero-nutrition-card__bar-seg--protein" />
                <span className="hero-nutrition-card__bar-seg hero-nutrition-card__bar-seg--fat" />
                <span className="hero-nutrition-card__bar-seg hero-nutrition-card__bar-seg--carb" />
              </div>
              <div className="hero-nutrition-card__legend">
                <span className="hero-nutrition-card__legend-item hero-nutrition-card__legend-item--protein">
                  Белки 12г
                </span>
                <span className="hero-nutrition-card__legend-item hero-nutrition-card__legend-item--fat">
                  Жиры 18г
                </span>
                <span className="hero-nutrition-card__legend-item hero-nutrition-card__legend-item--carb">
                  Углев. 45г
                </span>
              </div>
            </aside>
          </div>
        </div>

      </main>
    </>
  )
}

export default HeroSection
