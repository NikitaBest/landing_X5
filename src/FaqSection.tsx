import { useState } from 'react'
import './FaqSection.css'

type FaqItem = {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Это медицинская диагностика или рекомендации по питанию?',
    answer:
      'Это персональные рекомендации по рациону на основе анализа состояния. Сервис не ставит медицинские диагнозы.',
  },
  {
    question: 'Это безопасно для здоровья?',
    answer:
      'Да, анализ выполняется бесконтактно через камеру смартфона. Процесс не требует физического вмешательства.',
  },
  {
    question: 'Насколько точны результаты?',
    answer:
      'Алгоритм использует rPPG-сигналы и модели ИИ, чтобы сформировать полезные рекомендации для повседневного питания.',
  },
  {
    question: 'Как формируется рацион?',
    answer:
      'Система учитывает ваш профиль, сигналы состояния и цели, после чего предлагает индивидуальные рекомендации по питанию.',
  },
  {
    question: 'Сколько времени занимает сканирование?',
    answer:
      'Обычно сканирование занимает около 60 секунд, после чего формируется персональный результат.',
  },
  {
    question: 'Мои данные сохраняются?',
    answer:
      'Данные обрабатываются в рамках сервиса для подготовки рекомендаций. В публичный доступ информация не передается.',
  },
  {
    question: 'Нужно ли специальное оборудование?',
    answer: 'Нет, нужен только смартфон с камерой и стабильным освещением.',
  },
  {
    question: 'Это бесплатно?',
    answer: 'Базовый доступ к сканированию и рекомендациям предоставляется бесплатно.',
  },
]

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="faq" id="faq">
      <div className="section faq__inner">
        <h2 className="faq__title">Частые вопросы</h2>

        <div className="faq__grid">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <article className={`faq__item ${isOpen ? 'faq__item--open' : ''}`} key={item.question}>
                <button
                  className="faq__button"
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="faq__chevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </button>

                {isOpen && <p className="faq__answer">{item.answer}</p>}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
