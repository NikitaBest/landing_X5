import { useEffect, useRef, useState } from 'react'
import './ProcessSection.css'

function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`process ${isVisible ? 'process--visible' : ''}`}
      id="tech"
    >
      <div className="section process__inner">
        <h2 className="process__title">
        От состояния вашего здоровья <span className="process__title-accent">к рациону</span>
        </h2>
        <p className="process__subtitle">
          Всего 3 шага — и вы получаете рацион, подобранный под ваши задачи и состояние
        </p>

        <div className="process__grid">
          <article className="process-card process-card--reveal process-card--d1">
            <span className="process-card__icon" aria-hidden="true">
              <img src="/bloc2-1.svg" alt="" loading="lazy" decoding="async" />
            </span>
            <h3>Пройдите чекап</h3>
            <p>Наведите селфи-камеру - всё остальное сделает ИИ.</p>
            <span className="process-card__badge">За 60 секунд</span>
          </article>

          <span className="process__arrow process-card--reveal process-card--d2" aria-hidden="true">
            <img src="/strl2.svg" alt="" loading="lazy" decoding="async" />
          </span>

          <article className="process-card process-card--active process-card--reveal process-card--d3">
            <span className="process-card__icon" aria-hidden="true">
              <img src="/bloc2-2.svg" alt="" loading="lazy" decoding="async" />
            </span>
            <h3>Состояние здоровья</h3>
            <p>Узнайте 20+ биомаркеров и что именно влияет на состояние вашего организма.</p>
            <span className="process-card__badge">20+ биомаркеров</span>
          </article>

          <span className="process__arrow process-card--reveal process-card--d4" aria-hidden="true">
            <img src="/strl2.svg" alt="" loading="lazy" decoding="async" />
          </span>

          <article className="process-card process-card--reveal process-card--d5">
            <span className="process-card__icon" aria-hidden="true">
              <img src="/bloc2-3.svg" alt="" loading="lazy" decoding="async" />
            </span>
            <h3>Ваш рацион готов</h3>
            <p>Подобран с учётом вашего состояния для улучшения самочувствия и снижения рисков здоровья.</p>
            <span className="process-card__badge">На 7 дней</span>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
