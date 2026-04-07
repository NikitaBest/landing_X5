import { useEffect, useState } from 'react'
import './FaqSection.css'

type FaqItem = {
  id?: string
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Это медицинская диагностика или рекомендации по питанию?',
    answer:
      'Сервис предназначен не для целей медицинского использования. Анализ состояния организма и формирование персональных рекомендаций по питанию и образу жизни предназначены для личного использования. Мы не ставим медицинский диагноз. За более точными медицинским заключением необходимо обратиться к врачу.',
  },
  {
    question: 'Это безопасно для здоровья?',
    answer:
      'Да, это полностью безопасно.\nСканирование происходит с помощью камеры смартфона — без контакта и дополнительного оборудования.',
  },
  {
    question: 'Насколько точны результаты?',
    answer:
      'Технология основана на анализе микросигналов кровотока (rPPG) и современных алгоритмах обработки данных. Результаты позволяют оценить текущее состояние организма и использовать их для персонализации рекомендаций, в среднем точность сервиса при соблюдении всех условий сканирования выше 90% по всем показателям.',
  },
  {
    question: 'Как формируется рацион?',
    answer:
      'Рацион формируется на основе вашего текущего состояния, выявленных показателей и целей.\nАлгоритм подбирает продукты и блюда, которые помогают поддерживать баланс организма и снижать возможные риски.',
  },
  {
    question: 'Сколько времени занимает сканирование?',
    answer:
      'Сканирование занимает около 60 секунд.\nВсё происходит в формате селфи-видео через камеру смартфона.',
  },
  {
    question: 'Мои данные сохраняются?',
    answer:
      'Мы НЕ собираем биометрию пользователей сервиса, НЕ храним и НЕ передаем фото или видео изображения. Мы обрабатываем и анализируем ТОЛЬКО свойства отраженного света от кожи вашего лица, а эти данные используются ТОЛЬКО для формирования рекомендаций по рациону питания.',
  },
  {
    question: 'Какие требования к устройствам и ПО для сканирования?',
    answer:
      'Для сканирования необходимо использовать ТОЛЬКО смартфон с камерой. Сканирование проходит прямо в браузере или приложении. Персональные компьютеры, ноутбуки и планшеты для сканирования НЕ использовать.\n\nДля сканирования поддерживаются следующее ПО:\nIOS (Айфоны) - iOS и Safari версии 16.7 и выше браузеры:\nAndroid - Google Chrome версия 113 и выше\nЕсли версия ПО на вашем смартфоне более ранняя, то необходимо установить рекомендуемые выше версии ПО.',
  },
  {
    question: 'Это бесплатно?',
    answer: 'Да, это бесплатно для пользователя.',
  },
  {
    id: 'metrics',
    question: 'Какие показатели анализируются?',
    answer:
      'Сервис анализирует более 20 биомаркеров, включая пульс, стресс, давление, риски уровня гемоглобина и холестерина, а также другие показатели и риски здоровья, связанные с состоянием организма.',
  },
  {
    question: 'Почему это работает через камеру?',
    answer:
      'Технология основана на дистанционной фотоплетизмографии (rPPG) — методе, который анализирует микропульсации кровотока по изменениям отражения света от поверхности кожи. Камера фиксирует эти незаметные глазу сигналы, а ИИ алгоритм обрабатывает их и определяет состояние организма. Примеры использования метода фотоплетизмографии (PPG) в повседневной жизни - это фитнес-браслеты, умные часы и кольца.',
  },
]

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const onOpenFaqItem = (event: Event) => {
      const customEvent = event as CustomEvent<{ id?: string }>
      const targetId = customEvent.detail?.id
      if (!targetId) {
        return
      }

      const nextIndex = FAQ_ITEMS.findIndex((item) => item.id === targetId)
      if (nextIndex !== -1) {
        setOpenIndex(nextIndex)
      }
    }

    window.addEventListener('open-faq-item', onOpenFaqItem)
    return () => window.removeEventListener('open-faq-item', onOpenFaqItem)
  }, [])

  return (
    <section className="faq" id="faq">
      <div className="section faq__inner">
        <h2 className="faq__title">Часто задаваемые вопросы</h2>

        <div className="faq__grid">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <article
                id={item.id ? `faq-${item.id}` : undefined}
                className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                key={item.question}
              >
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
