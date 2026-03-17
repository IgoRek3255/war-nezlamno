import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Moon, Sun, MapPin, ShieldCheck, Heart } from 'lucide-react'
import { useShelterStore } from '../store'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { darkMode, toggleDarkMode, favorites } = useShelterStore()

  const navLinks = [
    { name: 'Головна', path: '/' },
    { name: 'Карта', path: '/map' },
    { name: 'Обрані', path: '/favorites' },
    { name: 'Про нас', path: '/about' },
  ]

  return (
    <header className="sticky top-0 z-[9999] border-b border-gray-200/80 dark:border-dark-border bg-white/90 dark:bg-dark-card/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-[72px]">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-xl font-bold text-gray-900 dark:text-white leading-tight">
                WarNezlamno
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">
                Карта безпечних місць
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/favorites"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors"
              title="Обрані укриття"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Обрані</span>
              <span className="min-w-5 h-5 px-1 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center">
                {favorites.length}
              </span>
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Перемикнути тему"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Відкрити меню"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <nav className="rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-slate-900 shadow-sm p-3 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <Link
                to="/favorites"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-pink-600 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/30"
              >
                <span className="inline-flex items-center gap-2 font-medium">
                  <Heart className="w-4 h-4" />
                  Обрані
                </span>
                <span className="min-w-5 h-5 px-1 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center">
                  {favorites.length}
                </span>
              </Link>

              <div className="px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Швидкий доступ до укриттів поруч
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
