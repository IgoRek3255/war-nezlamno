import {
  Shield,
  Target,
  Users,
  Zap,
  Github,
  Mail,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutUs() {
  const team = [
    {
      name: 'Розробка',
      role: 'Frontend & Архітектура',
      description: 'React, Zustand, Tailwind CSS, інтерактивні UI-рішення',
    },
    {
      name: 'Дизайн',
      role: 'UX/UI Design',
      description: 'Зрозумілий, доступний і сучасний інтерфейс',
    },
    {
      name: 'Дані',
      role: 'Структура та перевірка',
      description: 'Організація та оновлення інформації про укриття',
    },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Безпека',
      description: 'Швидкий доступ до потрібної інформації без зайвих дій.',
    },
    {
      icon: Target,
      title: 'Точність',
      description: 'Ми прагнемо, щоб дані були корисними, актуальними й зрозумілими.',
    },
    {
      icon: Users,
      title: 'Спільнота',
      description: 'Користувачі можуть повідомляти про зміни й допомагати покращувати сервіс.',
    },
    {
      icon: Zap,
      title: 'Швидкість',
      description: 'Інтерфейс розроблено так, щоб усе важливе було знайдено за секунди.',
    },
  ]

  const features = [
    'Інтерактивна карта укриттів',
    'Пошук за назвою та адресою',
    'Обрані укриття',
    'Відгуки та рейтинги',
    'Маршрут до укриття',
    'Нещодавно переглянуті локації',
    'Історія пошуку',
    'Адаптивний інтерфейс',
  ]

  const faq = [
    {
      q: 'Як знайти укриття поблизу мене?',
      a: 'Перейдіть на сторінку карти та скористайтеся кнопкою визначення місцезнаходження.',
    },
    {
      q: 'Чи можна зберегти укриття на потім?',
      a: 'Так, натисніть на іконку сердечка, і укриття з’явиться в розділі «Обрані».',
    },
    {
      q: 'Як працює історія пошуку?',
      a: 'Останні пошукові запити зберігаються локально у вашому браузері для швидкого повторного доступу.',
    },
    {
      q: 'Чи можна повідомити про помилку в даних?',
      a: 'Так, на сторінці карти доступні форми скарги та пропозиції зміни інформації.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
              <HeartHandshake className="w-4 h-4" />
              Про платформу
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Про WarNezlamno</h1>
            <p className="text-xl text-blue-100">
              Платформа створена, щоб допомогти швидко знайти укриття, отримати важливу інформацію
              та діяти впевненіше в критичний момент.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Наша місія</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                WarNezlamno створена для того, щоб інформація про укриття була доступною,
                зрозумілою та корисною.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Ми прагнемо зменшити час на пошук безпечного місця та дати користувачеві
                інструменти, які допомагають діяти швидко.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Це сучасний навчально-практичний проєкт, побудований навколо простоти, швидкості
                та зручності.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => {
                const Icon = value.icon

                return (
                  <div
                    key={index}
                    className="card rounded-3xl border border-gray-200/70 dark:border-dark-border"
                  >
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Можливості платформи
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card rounded-3xl border border-gray-200/70 dark:border-dark-border"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-900 dark:text-white font-medium">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Наша команда
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="card rounded-3xl border border-gray-200/70 dark:border-dark-border text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Часті запитання
          </h2>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <details
                key={index}
                className="card rounded-3xl border border-gray-200/70 dark:border-dark-border cursor-pointer group"
              >
                <summary className="font-bold text-gray-900 dark:text-white flex justify-between items-center">
                  {item.q}
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-600 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-dark-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Зв&apos;яжіться з нами
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Маєте питання, пропозиції або хочете поділитися ідеєю покращення?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@warnezlamno.com.ua"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>

            <a
              href="https://github.com/IgoRek3255/war-nezlamno"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Готові перейти до дії?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Відкрийте карту та дізнайтеся, які укриття є поблизу вас.
          </p>
          <Link
            to="/map"
            className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-colors inline-block"
          >
            Перейти на карту
          </Link>
        </div>
      </section>
    </div>
  )
}