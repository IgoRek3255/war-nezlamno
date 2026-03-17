import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  MapPin,
  Heart,
  Shield,
  TrendingUp,
  Zap,
  Users,
  ArrowRight,
  Star,
  Navigation,
  History,
  Clock3,
} from 'lucide-react'
import { useShelterStore } from '../store'

export default function Home() {
  const navigate = useNavigate()
  const {
    setSearchQuery,
    setUserLocation,
    getShelters,
    favorites,
    searchHistory,
    addSearchHistory,
    getRecentShelters,
  } = useShelterStore()

  const [topShelters, setTopShelters] = useState([])
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const sorted = [...getShelters()].sort((a, b) => b.rating - a.rating).slice(0, 3)
    setTopShelters(sorted)
  }, [getShelters])

  const recentShelters = useMemo(() => getRecentShelters().slice(0, 3), [getRecentShelters])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchQuery(searchInput)
      addSearchHistory(searchInput)
      navigate('/map')
    }
  }

  const handleQuickSearch = (query) => {
    setSearchQuery(query)
    addSearchHistory(query)
    navigate('/map')
  }

  const getLocation = () => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      navigate('/map')
    })
  }

  const shelters = useMemo(() => getShelters(), [getShelters])

  const stats = [
    { label: 'Укриттів', value: shelters.length, icon: Shield },
    { label: 'Обраних місць', value: favorites.length, icon: Heart },
    { label: 'Середній рейтинг', value: '4.7', icon: Star },
  ]

  const features = [
    {
      icon: MapPin,
      title: 'Інтерактивна карта',
      description: 'Швидко знаходьте укриття на карті та переглядайте важливі деталі.',
    },
    {
      icon: Navigation,
      title: 'Маршрут в один клік',
      description: 'Одразу відкривайте навігацію до потрібного безпечного місця.',
    },
    {
      icon: Heart,
      title: 'Обрані укриття',
      description: 'Зберігайте локації, до яких хочете повертатися без повторного пошуку.',
    },
    {
      icon: TrendingUp,
      title: 'Рейтинги та відгуки',
      description: 'Оцінюйте укриття й переглядайте досвід інших користувачів.',
    },
    {
      icon: Shield,
      title: 'Детальна інформація',
      description: 'Адреса, місткість, опис, зручності та корисні позначки в одному місці.',
    },
    {
      icon: Zap,
      title: 'Швидкий доступ',
      description: 'Сервіс створений так, щоб потрібна інформація була під рукою максимально швидко.',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
                <Shield className="w-4 h-4" />
                Безпечний пошук укриттів поруч
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">WarNezlamno</h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-4">
                Карта укриттів та місць безпеки
              </p>

              <p className="text-base md:text-lg text-blue-100/90 max-w-2xl mb-8">
                Допомагає швидко знайти укриття, побудувати маршрут, зберегти важливі локації та
                переглянути інформацію, коли час особливо цінний.
              </p>

              <form onSubmit={handleSearch} className="max-w-2xl mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Пошук укриття, адреси або району..."
                      className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    Пошук
                  </button>
                </div>
              </form>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={getLocation}
                  className="px-8 py-3 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  <MapPin className="w-5 h-5" />
                  Мої укриття поруч
                </button>

                <button
                  onClick={() => navigate('/map')}
                  className="px-8 py-3 bg-blue-900/60 border border-white/20 text-white font-bold rounded-2xl hover:bg-blue-900 transition-colors inline-flex items-center justify-center gap-2"
                >
                  На карту
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {searchHistory.length > 0 && (
                <div>
                  <p className="text-sm text-blue-100 mb-3 inline-flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Останні пошуки
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.slice(0, 5).map((item) => (
                      <button
                        key={item}
                        onClick={() => handleQuickSearch(item)}
                        className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-sm transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon

                return (
                  <div
                    key={stat.label}
                    className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md p-6 shadow-xl"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-blue-100">{stat.label}</p>
                  </div>
                )
              })}

              <div className="sm:col-span-2 rounded-3xl bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 border border-white/15 backdrop-blur-md p-6 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Зручно, швидко, зрозуміло</h3>
                    <p className="text-blue-100">
                      Інтерфейс створено так, щоб у стресовій ситуації все було буквально за кілька
                      кліків.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {recentShelters.length > 0 && (
            <div className="mt-12 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock3 className="w-5 h-5" />
                <h2 className="text-xl font-bold">Нещодавно переглянуті</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentShelters.map((shelter) => (
                  <button
                    key={shelter.id}
                    onClick={() => handleQuickSearch(shelter.name)}
                    className="text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-4 transition-colors"
                  >
                    <p className="font-semibold mb-1">{shelter.name}</p>
                    <p className="text-sm text-blue-100">{shelter.address}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-14 bg-gray-50 dark:bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="card text-center rounded-3xl border border-gray-200/70 dark:border-dark-border"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                      <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-18 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Чому варто обрати WarNezlamno?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Продуманий сервіс для швидкої орієнтації, зручної навігації та роботи з укриттями.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon

              return (
                <div
                  key={index}
                  className="card rounded-3xl border border-gray-200/70 dark:border-dark-border hover:-translate-y-1"
                >
                  <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl inline-flex">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-18 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Топ укриттів</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Найкраще оцінені місця за відгуками користувачів
              </p>
            </div>

            <button onClick={() => navigate('/map')} className="btn-primary w-fit">
              Переглянути всі
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topShelters.map((shelter, index) => (
              <div
                key={shelter.id}
                className="card rounded-3xl border border-gray-200/70 dark:border-dark-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-bold">
                    TOP #{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900 dark:text-white">{shelter.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {shelter.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {shelter.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{shelter.capacity} осіб</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}