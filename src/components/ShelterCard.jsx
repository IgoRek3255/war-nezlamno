import {
  Heart,
  MapPin,
  Users,
  Star,
  AlertTriangle,
  Edit3,
  Navigation,
  Shield,
} from 'lucide-react'
import { useShelterStore } from '../store'

export default function ShelterCard({
                                      shelter,
                                      showDistance = false,
                                      onClick,
                                      onReport,
                                      onReview,
                                      onSuggestChange,
                                      reportsCount = 0,
                                    }) {
  const { isFavorite, addFavorite, removeFavorite, userLocation } = useShelterStore()

  const handleNavigate = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${shelter.lat},${shelter.lng}&travelmode=walking`
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${shelter.lat},${shelter.lng}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const favorite = isFavorite(shelter.id)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()

    if (favorite) {
      removeFavorite(shelter.id)
    } else {
      addFavorite(shelter.id)
    }
  }

  const categoryLabel = {
    метро: '🚇 Метро',
    укриття: '🛡️ Укриття',
    сховище: '🏠 Сховище',
    бункер: '🏚️ Бункер',
  }

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-gray-200/80 dark:border-dark-border bg-white dark:bg-dark-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-80"></div>

      <div className="p-5">
        <div className="flex justify-between items-start gap-3 mb-4">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold mb-3">
              <Shield className="w-3.5 h-3.5" />
              {categoryLabel[shelter.category] || shelter.category}
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-2">
              {shelter.name}
            </h3>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs font-medium">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              {shelter.rating}
              <span className="text-gray-500 dark:text-gray-400">({shelter.reviews} відгуків)</span>
            </div>
          </div>

          <button
            onClick={handleFavoriteClick}
            className="p-2.5 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-colors flex-shrink-0"
            title={favorite ? 'Прибрати з обраних' : 'Додати в обране'}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                favorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500'
              }`}
            />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{shelter.address}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span>Місткість: {shelter.capacity} осіб</span>
          </div>

          {showDistance && shelter.distance && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 text-sm font-semibold">
              <Navigation className="w-4 h-4 flex-shrink-0" />
              <span>{shelter.distance} м від вас</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 min-h-[60px]">
          {shelter.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {shelter.amenities.slice(0, 4).map((amenity) => (
            <span
              key={`${shelter.id}-${amenity}`}
              className="px-2.5 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {shelter.amenities.length > 4 && (
            <span className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-full">
              +{shelter.amenities.length - 4}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {onReview && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onReview(shelter)
              }}
              className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
              title="Залишити відгук"
            >
              <Star className="w-4 h-4" />
              Відгук
            </button>
          )}

          {onSuggestChange && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSuggestChange(shelter)
              }}
              className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
              title="Запропонувати зміну"
            >
              <Edit3 className="w-4 h-4" />
              Зміна
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNavigate()
            }}
            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            title="Побудувати маршрут"
          >
            <Navigation className="w-4 h-4" />
            Маршрут
          </button>

          {onReport && (
            <div className="relative flex-1 min-w-[120px]">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onReport(shelter)
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                title="Поскаржитися"
              >
                <AlertTriangle className="w-4 h-4" />
                Скарга
              </button>

              {reportsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow">
                  {reportsCount}
                </span>
              )}
            </div>
          )}
        </div>

        <button className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold hover:from-blue-700 hover:to-indigo-800 transition-colors shadow-sm">
          Докладніше
        </button>
      </div>
    </div>
  )
}