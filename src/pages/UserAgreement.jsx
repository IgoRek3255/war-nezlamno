import { FileText, ShieldCheck, AlertTriangle, Scale, RefreshCcw } from 'lucide-react'

export default function UserAgreement() {
  const sections = [
    {
      icon: FileText,
      title: '1. Вступ',
      text: 'Використовуючи WarNezlamno, ви погоджуєтесь із правилами використання сервісу та розумієте його інформаційний характер.',
    },
    {
      icon: ShieldCheck,
      title: '2. Призначення сервісу',
      text: 'Платформа допомагає знаходити укриття, переглядати інформацію про них і взаємодіяти з сервісом через пошук, обране, скарги та відгуки.',
    },
    {
      icon: AlertTriangle,
      title: '3. Відповідальність користувача',
      text: 'Користувач самостійно оцінює доречність використання інформації та приймає рішення з урахуванням реальної ситуації на місці.',
    },
    {
      icon: Scale,
      title: '4. Обмеження відповідальності',
      text: 'Інформація в сервісі надається «як є». Ми не гарантуємо абсолютну точність усіх записів і рекомендуємо перевіряти актуальність даних додатково.',
    },
    {
      icon: RefreshCcw,
      title: '5. Оновлення умов',
      text: 'Умови можуть змінюватися. Актуальна редакція завжди публікується на цій сторінці.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <section className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-18">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
            <FileText className="w-4 h-4" />
            Угода користувача
          </div>
          <h1 className="text-5xl font-bold mb-4">Правила використання сервісу</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Коротко, зрозуміло і без юридичного туману настільки, наскільки це можливо.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon

            return (
              <div
                key={index}
                className="card rounded-3xl border border-gray-200/70 dark:border-dark-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-7">{section.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 card rounded-3xl border border-gray-200/70 dark:border-dark-border bg-blue-50/60 dark:bg-slate-900">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Додаткове зауваження
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-7">
            Якщо ви залишаєте скарги, відгуки чи пропозиції, будь ласка, робіть це коректно та
            по суті. Це допомагає підтримувати сервіс корисним для всіх користувачів.
          </p>
        </div>
      </div>
    </div>
  )
}