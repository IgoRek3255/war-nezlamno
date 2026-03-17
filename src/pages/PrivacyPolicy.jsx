import { Shield, Database, Lock, Eye, Mail } from 'lucide-react'

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Database,
      title: 'Яку інформацію ми зберігаємо',
      content:
        'Сервіс може локально зберігати обрані укриття, історію пошуку, нещодавно переглянуті місця, скарги, пропозиції та налаштування теми.',
    },
    {
      icon: Eye,
      title: 'Як використовуються дані',
      content:
        'Дані допомагають покращити зручність користування: швидше знаходити потрібні укриття, повторювати пошук і зберігати персональні налаштування.',
    },
    {
      icon: Lock,
      title: 'Передача третім сторонам',
      content:
        'У межах цього локального демо-проєкту дані не передаються стороннім сервісам і не зберігаються на окремому сервері застосунку.',
    },
    {
      icon: Shield,
      title: 'Контроль користувача',
      content:
        'Ви можете очистити локальні дані через браузер або через функціональність самого застосунку, якщо така доступна.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <section className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-18">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
            <Shield className="w-4 h-4" />
            Політика конфіденційності
          </div>
          <h1 className="text-5xl font-bold mb-4">Ваші дані та приватність</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Ми прагнемо пояснювати просто: які дані можуть зберігатися, для чого вони потрібні
            та як ви можете ними керувати.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {sections.map((section, index) => {
            const Icon = section.icon

            return (
              <div
                key={index}
                className="card rounded-3xl border border-gray-200/70 dark:border-dark-border"
              >
                <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{section.content}</p>
              </div>
            )
          })}
        </div>

        <div className="card rounded-3xl border border-gray-200/70 dark:border-dark-border">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Важливо знати</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              Сервіс орієнтований на локальне використання в браузері. Це означає, що значна
              частина персоналізації зберігається на вашому пристрої.
            </p>
            <p>
              Якщо ви використовуєте форми скарг або пропозицій і додаєте контактні дані, вони
              також зберігаються локально в межах цього застосунку.
            </p>
            <p>
              Ми рекомендуємо не вводити зайву особисту інформацію, якщо в цьому немає потреби.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-border">
            <p className="text-gray-700 dark:text-gray-300 inline-flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Якщо у вас є питання, звертайтесь: <strong>contact@warnezlamno.ua</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}