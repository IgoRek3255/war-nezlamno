import { useEffect, useMemo, useState } from 'react'
import { Heart, ArrowLeft, MapPin, Star, Clock3 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useShelterStore } from '../store'
import ShelterCard from '../components/ShelterCard'

export default function Favorites() {
  const navigate = useNavigate()
  const {
    favorites,
    userLocation,
    setUserLocation,
    getShelters,
    getRecentShelters,
    setSearchQuery,
    addSearchHistory,
  } = useShelterStore()

  const [favoriteShelters, setFavoriteShelters] = useState([])

  useEffect(() => {
    const shelters = getShelters().filter((shelter) => favorites.includes(shelter.id))
    setFavoriteShelters(shelters)
  }, [favorites, getShelters])

  const recentShelters = useMemo(
    () => getRecentShelters().filter((shelter) => !favorites.includes(shelter.id)).slice(0, 3),
    [getRecentShelters, favorites]
  )

  const getLocation = () => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }

  const openShelterOnMap = (name) => {
    setSearchQuery(name)
    addSearchHistory(name)
    navigate('/map')
  }

  if (favoriteShelters.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            На головну
          </Link>

          <div className="bg-white dark:bg-dark-card rounded-3xl border border-gray-200 dark:border-dark-border shadow-lg p-8 md:p-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-gray-100 dark:bg-dark-border rounded-full">
                  <Heart className="w-12 h-12 text-gray-400" />
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                У вас ще немає обраних укриттів
              </h1>

              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Додайте кілька важливих місць до обраного, щоб мати швидкий доступ до них у
                потрібний момент.
              </p>

              <Link to="/map" className="btn-primary">
                Перейти на карту
              </Link>
            </div>

            {recentShelters.length > 0 && (
              <div className="mt-12 pt-10 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-5">
                  <Clock3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Нещодавно переглянуті
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentShelters.map((shelter) => (
                    <button
                      key={shelter.id}
                      onClick={() => openShelterOnMap(shelter.name)}
                      className="text-left p-4 rounded-2xl border border-gray-200 dark:border-dark-border hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        {shelter.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{shelter.address}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            На головну
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Обрані укриття
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Швидкий доступ до важливих місць, які ви зберегли.
              </p>
            </div>

            <button onClick={getLocation} className="btn-primary w-fit">
              📍 Показати відстань до моїх укриттів
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card rounded-3xl border border-gray-200/70 dark:border-dark-border">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Усього в обраному</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {favoriteShelters.length}
            </p>
          </div>

          <div className="card rounded-3xl border border-gray-200/70 dark:border-dark-border">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Середній рейтинг</p>
            <p className="text-3xl font-bold text-yellow-500 inline-flex items-center gap-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              {(
                favoriteShelters.reduce((sum, shelter) => sum + shelter.rating, 0) /
                favoriteShelters.length
              ).toFixed(1)}
            </p>
          </div>

          <div className="card rounded-3xl border border-gray-200/70 dark:border-dark-border">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Загальна місткість</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {favoriteShelters.reduce((sum, shelter) => sum + shelter.capacity, 0)}
            </p>
          </div>
        </div>

        {recentShelters.length > 0 && (
          <div className="card rounded-3xl border border-gray-200/70 dark:border-dark-border mb-8">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Можливо, ви теж захочете додати
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentShelters.map((shelter) => (
                <button
                  key={shelter.id}
                  onClick={() => openShelterOnMap(shelter.name)}
                  className="text-left p-4 rounded-2xl border border-gray-200 dark:border-dark-border hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors"
                >
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{shelter.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{shelter.address}</p>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Відкрити на карті
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteShelters.map((shelter) => (
            <ShelterCard key={shelter.id} shelter={shelter} showDistance={Boolean(userLocation)} />
          ))}
        </div>
      </div>
    </div>
  )
}