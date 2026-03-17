import { Link } from 'react-router-dom'
import {
  Github,
  Mail,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Heart,
  ArrowUpRight,
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickActions = [
    { to: '/map', label: 'Відкрити карту', icon: MapPin },
    { to: '/favorites', label: 'Мої обрані', icon: Heart },
    { to: '/about', label: 'Про платформу', icon: ShieldCheck },
  ]

  return (
    <footer className="relative mt-16 border-t border-gray-200/70 dark:border-dark-border bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 text-gray-700 dark:text-gray-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 rounded-2xl border border-blue-100 dark:border-blue-900/50 bg-white/80 dark:bg-slate-900/70 backdrop-blur shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300 mb-4">
                <ShieldCheck className="w-4 h-4" />
                Швидкий доступ до безпечних місць
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                WarNezlamno
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                Платформа для швидкого пошуку укриттів, навігації до найближчих локацій та
                збереження важливих місць у обране. Простий інтерфейс, сучасний дизайн і
                трохи менше хаосу в критичний момент.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon

                return (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="group flex items-center justify-between rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50/80 dark:bg-slate-800/70 px-4 py-3 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-white dark:hover:bg-slate-800 transition-all"
                  >
                    <span className="inline-flex items-center gap-3 font-medium text-gray-800 dark:text-gray-100">
                      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      {action.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-4">Про сервіс</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-6">
              Допомагаємо швидко знайти укриття, переглянути деталі, зберегти потрібні місця
              та побудувати маршрут.
            </p>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Навігація</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Карта
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Обрані
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Про нас
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Корисні ресурси</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.dsns.gov.ua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  ДСНС України <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.kyivcity.gov.ua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  КМДА <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://koda.gov.ua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  КОВА <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Контакти</h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:contact@warnezlamno.com.ua"
                className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-5 h-4" />
                contact@warnezlamno.com.ua
              </a>
              <a
                href="https://github.com/IgoRek3255/war-nezlamno"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="w-6 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-border pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; {currentYear} WarNezlamno. Всі права захищені.</p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Політика конфіденційності
              </Link>
              <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Угода користувача
              </Link>
              <Link to="/admin" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Адмін
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
