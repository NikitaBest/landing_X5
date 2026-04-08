import { useEffect, useState } from 'react'
import Button from './Button'
import './HeroSection.css'

type HeroSectionProps = {
  onOpenScanModal: () => void
  onOpenScanModalWeb: () => void
}

function HeroSection({ onOpenScanModal, onOpenScanModalWeb }: HeroSectionProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFrameReady, setIsFrameReady] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isHeroMediaVisible, setIsHeroMediaVisible] = useState(false)
  const [areHeroCardsVisible, setAreHeroCardsVisible] = useState(false)
  const [isHeroVideoPlayable, setIsHeroVideoPlayable] = useState(false)

  useEffect(() => {
    let isCancelled = false

    const frameImage = new Image()
    const markFrameReady = () => {
      if (!isCancelled) {
        setIsFrameReady(true)
      }
    }

    frameImage.src = '/iPhone.png'
    if (frameImage.complete) {
      markFrameReady()
    } else {
      frameImage.onload = markFrameReady
      frameImage.onerror = markFrameReady
    }

    const preloadedVideo = document.createElement('video')
    const markVideoReady = () => {
      if (!isCancelled) {
        setIsVideoReady(true)
      }
    }

    preloadedVideo.preload = 'auto'
    preloadedVideo.muted = true
    preloadedVideo.playsInline = true
    preloadedVideo.src = '/IMG_5365.MP4'

    if (preloadedVideo.readyState >= 2) {
      markVideoReady()
    } else {
      preloadedVideo.addEventListener('loadeddata', markVideoReady, { once: true })
      preloadedVideo.addEventListener('error', markVideoReady, { once: true })
      preloadedVideo.load()
    }

    const fallbackTimer = window.setTimeout(() => {
      if (!isCancelled) {
        setIsHeroMediaVisible(true)
      }
    }, 2800)

    return () => {
      isCancelled = true
      window.clearTimeout(fallbackTimer)
      preloadedVideo.pause()
      preloadedVideo.removeAttribute('src')
      preloadedVideo.load()
    }
  }, [])

  useEffect(() => {
    if (isFrameReady && isVideoReady) {
      setIsHeroMediaVisible(true)
    }
  }, [isFrameReady, isVideoReady])

  useEffect(() => {
    if (isVideoReady) {
      setIsHeroVideoPlayable(true)
    }
  }, [isVideoReady])

  useEffect(() => {
    if (!isHeroMediaVisible) {
      setAreHeroCardsVisible(false)
      return
    }

    const timer = window.setTimeout(() => setAreHeroCardsVisible(true), 260)
    return () => window.clearTimeout(timer)
  }, [isHeroMediaVisible])

  const handleOpenFaqMetrics = () => {
    window.dispatchEvent(new CustomEvent('open-faq-item', { detail: { id: 'metrics' } }))
    document.getElementById('faq-metrics')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

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
            <button className="hero-tag hero-tag--button" type="button" onClick={handleOpenFaqMetrics}>
              <img src="/60.svg" alt="" aria-hidden="true" />
              20+ показателей здоровья
            </button>
            <span className="hero-tag">
              <img src="/fon.svg" alt="" aria-hidden="true" />
              Без установки приложения
            </span>
          </div>
          <div className="actions">
            <Button
              variant="primary"
              className="hero-how-button"
              type="button"
              onClick={() => {
                document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              startIcon={<img src="/Iconcac.svg" alt="" aria-hidden="true" />}
            >
              Как это работает
            </Button>
            <Button
              variant="secondary"
              className="hero-scan-button"
              type="button"
              onClick={onOpenScanModal}
              startIcon={<img src="/Iconscan-green.svg" alt="" aria-hidden="true" />}
            >
              Пройти чекап
            </Button>
          </div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-visual" aria-busy={!isHeroMediaVisible}>
            {isHeroMediaVisible ? (
              <>
                <div className="hero-phone">
                  <img src="/iPhone.png" alt="" className="hero-phone__frame" aria-hidden />
                  <div className="hero-phone__screen">
                    {!isHeroVideoPlayable ? <div className="hero-phone__loader" aria-hidden="true" /> : null}
                    <video
                      className="hero-phone__video"
                      src="/IMG_5365.MP4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      onLoadedData={() => setIsHeroVideoPlayable(true)}
                      onCanPlay={() => setIsHeroVideoPlayable(true)}
                      aria-label="Демонстрация интерфейса NutriScan в приложении"
                    />
                  </div>
                </div>
                {areHeroCardsVisible ? (
                  <>
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
                    <aside className="hero-heart-card" aria-hidden="true">
                      <div className="hero-heart-card__title">Возраст сердца</div>
                      <div className="hero-heart-card__value">48</div>
                      <div className="hero-heart-card__badge">Требует внимания</div>
                      <div className="hero-heart-card__bar" role="presentation">
                        <span className="hero-heart-card__bar-seg hero-heart-card__bar-seg--low" />
                        <span className="hero-heart-card__bar-seg hero-heart-card__bar-seg--mid" />
                        <span className="hero-heart-card__bar-seg hero-heart-card__bar-seg--high" />
                      </div>
                      <div className="hero-heart-card__scale">
                        <span>до 30</span>
                        <span>31–37</span>
                        <span>37+</span>
                      </div>
                    </aside>
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
                  </>
                ) : null}
              </>
            ) : (
              <div className="hero-media-placeholder" aria-hidden="true" />
            )}
          </div>
        </div>

      </main>
    </>
  )
}

export default HeroSection
