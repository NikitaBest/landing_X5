import { useState } from 'react'
import Button from './Button'
import './HeroSection.css'

type HeroSectionProps = {
  onOpenScanModal: () => void
}

function HeroSection({ onOpenScanModal }: HeroSectionProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className={`section topbar ${isMobileMenuOpen ? 'topbar--menu-open' : ''}`}>
        <div className="brand">
          <img className="brand-icon" src="/iconlogj.svg" alt="Логотип NutriScan" />
          <span className="brand-name">NutriScan</span>
        </div>
        <nav className="menu" aria-label="Главное меню">
          <a href="#how">Как работает</a>
          <a href="#tech">Технология</a>
          <a href="#faq">FAQ</a>
          <Button className="menu-scan-button" type="button" onClick={onOpenScanModal}>
            Сканировать
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
      </header>

      {isMobileMenuOpen ? (
        <div className="mobile-menu" id="mobile-menu">
          <nav className="mobile-menu-nav" aria-label="Мобильное меню">
            <a href="#how" onClick={() => setIsMobileMenuOpen(false)}>
              Как работает
            </a>
            <a href="#tech" onClick={() => setIsMobileMenuOpen(false)}>
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
          60-секундное селфи-видео 
          анализирует состояние организма и подбирает персональный рацион для вас.
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
              startIcon={<img src="/Iconcac.svg" alt="" aria-hidden="true" />}
            >
              Как это работает
            </Button>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img src="/Group 1.png" alt="Превью приложения NutriScan" className="hero-image" />
        </div>
      </main>
    </>
  )
}

export default HeroSection
