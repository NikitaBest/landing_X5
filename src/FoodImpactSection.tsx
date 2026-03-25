import { useEffect, useRef, useState } from 'react'
import './FoodImpactSection.css'

function FoodImpactSection() {
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
      className={`food-impact ${isVisible ? 'food-impact--visible' : ''}`}
      id="food-impact"
    >
      <div className="section food-impact__inner">
        <h2 className="food-impact__title food-impact__anim food-impact__anim--d1">
          Как еда влияет на вас
        </h2>
        <p className="food-impact__subtitle food-impact__anim food-impact__anim--d2">
          Рацион формируется так, чтобы поддерживать организм и снижать выявленные риски
        </p>

        <div className="food-impact__scene-wrap">
          <div className="food-impact__scene">
            <img
              className="food-impact__plate food-impact__anim food-impact__anim--d4"
              src="/Tarelka.png"
              alt="Тост с авокадо и яйцом"
            />

            <img
              className="food-impact__pepper food-impact__anim food-impact__anim--d6"
              src="/bloc3-1.png"
              alt=""
              aria-hidden="true"
            />
            <img
              className="food-impact__avocado food-impact__anim food-impact__anim--d6"
              src="/bloc3-2.png"
              alt=""
              aria-hidden="true"
            />
            <img
              className="food-impact__salt food-impact__anim food-impact__anim--d5"
              src="/bloc3-3.png"
              alt=""
              aria-hidden="true"
            />
            <div className="food-impact__nutrition food-impact__anim food-impact__anim--d7">
              <h3>Пищевая ценность</h3>
              <p className="food-impact__kcal">
                <strong>280</strong> ккал
              </p>
              <div className="food-impact__bars" aria-hidden="true">
                <span className="food-impact__bar food-impact__bar--protein"></span>
                <span className="food-impact__bar food-impact__bar--fat"></span>
                <span className="food-impact__bar food-impact__bar--carbs"></span>
              </div>
              <div className="food-impact__meta">
                <span>
                  <i className="food-impact__dot food-impact__dot--protein"></i>
                  Белки 12г
                </span>
                <span>
                  <i className="food-impact__dot food-impact__dot--fat"></i>
                  Жиры 18г
                </span>
                <span>
                  <i className="food-impact__dot food-impact__dot--carbs"></i>
                  Углев. 45г
                </span>
              </div>
            </div>
            <img
              className="food-impact__nuts food-impact__anim food-impact__anim--d3"
              src="/Orehibloc3.png"
              alt=""
              aria-hidden="true"
            />
            <div className="food-impact__toast-tag food-impact__anim food-impact__anim--d5">
              <h3>Тост с авокадо и яйцом</h3>
              <p>Медленные углеводы, стабильный сахар</p>
            </div>

            <img
              className="food-impact__arrow-left food-impact__anim food-impact__anim--d5"
              src="/bloc3-6.svg"
              alt=""
              aria-hidden="true"
            />
            <img
              className="food-impact__arrow-right food-impact__anim food-impact__anim--d6"
              src="/bloc3-6.svg"
              alt=""
              aria-hidden="true"
            />
            <img
              className="food-impact__seeds food-impact__anim food-impact__anim--d7"
              src="/Semkibloc3.png"
              alt=""
              aria-hidden="true"
            />

            <div className="food-impact__ingredients food-impact__anim food-impact__anim--d6">
              <h3>Состав</h3>
              <p>Хлеб цельнозерновой, авокадо, яйцо куриное, оливковое масло, соль, перец.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FoodImpactSection
