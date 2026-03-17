import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import {
  Search,
  X,
  Filter,
  AlertTriangle,
  Plus,
  Send,
  MapPin,
  Star,
  Navigation,
  Heart,
  ArrowUpDown,
  Shield,
  Sparkles,
} from 'lucide-react'
import { filterShelters, calculateDistance } from '../data'
import { useShelterStore } from '../store'
import ShelterCard from '../components/ShelterCard'

class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    // eslint-disable-next-line no-console
    console.error('Map error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg p-6">
          <div className="max-w-xl w-full rounded-3xl border border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-900 p-6">
            <h2 className="text-xl font-bold text-red-700 dark:text-red-200 mb-4">
              Сталася помилка на карті
            </h2>
            <p className="text-sm text-red-800 dark:text-red-300 mb-4">
              Будь ласка, спробуйте перезавантажити сторінку або очистити кеш.
            </p>
            <pre className="text-xs text-red-800 dark:text-red-200 overflow-auto max-h-48 p-3 bg-white dark:bg-black rounded-2xl">
              {this.state.error?.toString()}
              {this.state.info?.componentStack}
            </pre>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const createCustomIcon = (isNearby) =>
  L.divIcon({
    html: `<div class="custom-marker ${isNearby ? 'nearby' : ''}"></div>`,
    className: 'custom-marker-container',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })

function MapRecenter({ userLocation, focusedShelter }) {
  const map = useMap()

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13)
    }
  }, [userLocation, map])

  useEffect(() => {
    if (focusedShelter) {
      map.setView([focusedShelter.lat, focusedShelter.lng], 16, {
        animate: true,
      })
    }
  }, [focusedShelter, map])

  return null
}

function MapContainerWrapper({
                               userLocation,
                               filteredShelters,
                               focusedShelter,
                               onReviewShelter,
                               onNavigate,
                               onReportShelter,
                             }) {
  return (
    <MapContainer center={[50.45, 30.52]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <MapRecenter userLocation={userLocation} focusedShelter={focusedShelter} />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>Ваше місцерозташування</Popup>
        </Marker>
      )}

      {filteredShelters.map((shelter) => (
        <Marker
          key={shelter.id}
          position={[shelter.lat, shelter.lng]}
          icon={createCustomIcon(Boolean(userLocation && Number(shelter.distance) < 500))}
        >
          <Popup>
            <div className="p-3 max-w-xs">
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="text-sm font-semibold text-gray-900">{shelter.name}</span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onReviewShelter(shelter)}
                    className="p-1 text-yellow-500 hover:text-yellow-600 transition-colors"
                    title="Залишити відгук"
                  >
                    <Star className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate(shelter)}
                    className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                    title="Побудувати маршрут"
                  >
                    <Navigation className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onReportShelter(shelter)}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    title="Поскаржитися на укриття"
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-2">{shelter.address}</p>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="font-bold text-xs">{shelter.rating}</span>
                  <span className="text-xs text-gray-500">({shelter.reviews})</span>
                </div>

                {shelter.distance && (
                  <span className="text-blue-600 text-xs font-semibold">{shelter.distance}м</span>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {shelter.amenities.slice(0, 3).map((amenity) => (
                  <span
                    key={`${shelter.id}-${amenity}`}
                    className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-600 line-clamp-2">{shelter.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

function ModalShell({ title, children, onClose, icon: Icon }) {
  return createPortal(
    <div className="fixed inset-0 bg-black/55 backdrop-blur-[2px] flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-border relative z-[10000]">
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="inline-flex items-center gap-3">
              {Icon ? (
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
              ) : null}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Map() {
  const {
    userLocation,
    setUserLocation,
    reports,
    addReport,
    removeReport,
    addShelterRequest,
    getShelters,
    approvedShelters,
    favorites,
    addRecentlyViewed,
  } = useShelterStore()

  const [searchInput, setSearchInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState(null)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showAddShelterModal, setShowAddShelterModal] = useState(false)
  const [showChangeModal, setShowChangeModal] = useState(false)
  const [selectedShelterForReport, setSelectedShelterForReport] = useState(null)
  const [selectedShelterForChange, setSelectedShelterForChange] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showReportsModal, setShowReportsModal] = useState(false)
  const [selectedShelterForReview, setSelectedShelterForReview] = useState(null)
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [sortBy, setSortBy] = useState('distance')
  const [focusedShelter, setFocusedShelter] = useState(null)

  const [reportForm, setReportForm] = useState({
    type: 'missing',
    description: '',
    contactInfo: '',
  })

  const [changeForm, setChangeForm] = useState({
    description: '',
    capacity: '',
    amenities: '',
  })

  const [addShelterForm, setAddShelterForm] = useState({
    name: '',
    address: '',
    category: 'укриття',
    capacity: '',
    description: '',
    amenities: [],
    lat: null,
    lng: null,
  })

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
  })

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('shelter-user-reviews')
      return saved ? JSON.parse(saved) : []
    } catch {
      localStorage.removeItem('shelter-user-reviews')
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('shelter-user-reviews', JSON.stringify(reviews))
  }, [reviews])

  const allShelters = useMemo(() => getShelters(), [getShelters, approvedShelters])

  const filteredShelters = useMemo(() => {
    const applyReviewStats = (shelter) => {
      const baseRating = shelter.rating ?? 0
      const baseReviews = shelter.reviews ?? 0
      const shelterReviews = reviews.filter((review) => review.shelterId === shelter.id)
      const userCount = shelterReviews.length
      const userSum = shelterReviews.reduce((sum, review) => sum + review.rating, 0)
      const totalCount = baseReviews + userCount
      const totalRatingSum = baseRating * baseReviews + userSum
      const avgRating = totalCount ? totalRatingSum / totalCount : 0

      return {
        ...shelter,
        rating: Math.round(avgRating * 10) / 10,
        reviews: totalCount,
      }
    }

    let updated = filterShelters(allShelters, searchInput, selectedCategory).map(applyReviewStats)

    if (favoritesOnly) {
      updated = updated.filter((shelter) => favorites.includes(shelter.id))
    }

    if (userLocation) {
      updated = updated.map((shelter) => ({
        ...shelter,
        distance: calculateDistance(userLocation.lat, userLocation.lng, shelter.lat, shelter.lng),
      }))
    }

    updated.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'capacity') return (b.capacity || 0) - (a.capacity || 0)

      if (sortBy === 'distance') {
        if (!userLocation) return b.rating - a.rating
        return Number(a.distance || Infinity) - Number(b.distance || Infinity)
      }

      return 0
    })

    return updated
  }, [allShelters, searchInput, selectedCategory, reviews, userLocation, favoritesOnly, favorites, sortBy])

  const clearLocation = () => {
    setUserLocation(null)
    setLocationError(null)
  }

  const handleShelterClick = (shelter) => {
    setFocusedShelter(shelter)
    addRecentlyViewed(shelter.id)
  }

  const handleReportShelter = (shelter) => {
    setSelectedShelterForReport(shelter)
    setShowReportModal(true)
    addRecentlyViewed(shelter.id)
  }

  const handleSuggestChange = (shelter) => {
    setSelectedShelterForChange(shelter)
    setChangeForm({
      description: shelter.description || '',
      capacity: shelter.capacity?.toString() || '',
      amenities: shelter.amenities?.join(', ') || '',
    })
    setShowChangeModal(true)
    addRecentlyViewed(shelter.id)
  }

  const handleReviewShelter = (shelter) => {
    setSelectedShelterForReview(shelter)
    setShowReviewModal(true)
    addRecentlyViewed(shelter.id)
  }

  const handleNavigate = (shelter) => {
    addRecentlyViewed(shelter.id)

    const url = userLocation
      ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${shelter.lat},${shelter.lng}&travelmode=walking`
      : `https://www.google.com/maps/search/?api=1&query=${shelter.lat},${shelter.lng}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()

    const newReview = {
      id: Date.now(),
      shelterId: selectedShelterForReview.id,
      rating: parseInt(reviewForm.rating, 10),
      comment: reviewForm.comment,
      timestamp: new Date().toISOString(),
    }

    setReviews((prev) => [...prev, newReview])
    setShowReviewModal(false)
    setReviewForm({ rating: 5, comment: '' })
    setSelectedShelterForReview(null)

    window.alert('Дякуємо за ваш відгук!')
  }

  const handleAddShelter = () => {
    if (userLocation) {
      setAddShelterForm((prev) => ({
        ...prev,
        lat: userLocation.lat,
        lng: userLocation.lng,
      }))
    }

    setShowAddShelterModal(true)
  }

  const handleReportSubmit = (e) => {
    e.preventDefault()

    const newReport = {
      id: Date.now(),
      shelterId: selectedShelterForReport.id,
      ...reportForm,
      timestamp: new Date().toISOString(),
      status: 'pending',
    }

    addReport(newReport)
    setShowReportModal(false)
    setReportForm({ type: 'missing', description: '', contactInfo: '' })
    setSelectedShelterForReport(null)

    window.alert('Дякуємо за повідомлення! Ми розглянемо вашу скаргу найближчим часом.')
  }

  const handleChangeSubmit = (e) => {
    e.preventDefault()

    const changes = {
      description: changeForm.description,
      capacity: changeForm.capacity ? parseInt(changeForm.capacity, 10) : undefined,
      amenities: changeForm.amenities
        ? changeForm.amenities
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
        : undefined,
    }

    addShelterRequest({
      id: Date.now(),
      type: 'update',
      shelterId: selectedShelterForChange.id,
      changes,
      timestamp: new Date().toISOString(),
      status: 'pending',
    })

    setShowChangeModal(false)
    setSelectedShelterForChange(null)
    setChangeForm({ description: '', capacity: '', amenities: '' })

    window.alert('Дякуємо! Вашу пропозицію змін буде розглянуто адміністрацією.')
  }

  const handleAddShelterSubmit = (e) => {
    e.preventDefault()

    const newShelter = {
      id: Date.now(),
      ...addShelterForm,
      capacity: addShelterForm.capacity ? parseInt(addShelterForm.capacity, 10) : 0,
      rating: 0,
      reviews: 0,
      accessibility: 'сходи',
      distance: null,
    }

    addShelterRequest({
      id: Date.now(),
      type: 'add',
      payload: newShelter,
      timestamp: new Date().toISOString(),
      status: 'pending',
    })

    setShowAddShelterModal(false)
    setAddShelterForm({
      name: '',
      address: '',
      category: 'укриття',
      capacity: '',
      description: '',
      amenities: [],
      lat: null,
      lng: null,
    })

    window.alert('Дякуємо за додавання укриття! Запит буде розглянуто адміністрацією.')
  }

  const getShelterReportsCount = (shelterId) =>
    reports.filter((report) => report.shelterId === shelterId && report.status === 'pending').length

  const handleAmenityToggle = (amenity) => {
    setAddShelterForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Геолокація не підтримується цим браузером')
      return
    }

    setLocationLoading(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLocationLoading(false)
      },
      (error) => {
        setLocationLoading(false)

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Доступ до геолокації заборонено')
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError('Інформація про місцезнаходження недоступна')
            break
          case error.TIMEOUT:
            setLocationError('Час очікування геолокації минув')
            break
          default:
            setLocationError('Невідома помилка геолокації')
            break
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    )
  }

  const categories = [
    { id: 'метро', label: '🚇 Метро' },
    { id: 'укриття', label: '🛡️ Укриття' },
    { id: 'сховище', label: '🏠 Сховище' },
  ]

  return (
    <MapErrorBoundary>
      <div>
        {showReportModal &&
          selectedShelterForReport &&
          ModalShell({
            title: 'Поскаржитися на укриття',
            onClose: () => setShowReportModal(false),
            icon: AlertTriangle,
            children: (
              <>
                <div className="mb-4 p-4 bg-gray-50 dark:bg-dark-border rounded-2xl border border-gray-200 dark:border-dark-border">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {selectedShelterForReport.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedShelterForReport.address}
                  </p>
                </div>

                <form onSubmit={handleReportSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Тип проблеми
                    </label>
                    <select
                      value={reportForm.type}
                      onChange={(e) =>
                        setReportForm((prev) => ({ ...prev, type: e.target.value }))
                      }
                      className="input-field"
                      required
                    >
                      <option value="missing">Укриття відсутнє за адресою</option>
                      <option value="closed">Укриття зачинене</option>
                      <option value="inaccessible">Недоступне для людей з інвалідністю</option>
                      <option value="incorrect_info">Неправильна інформація</option>
                      <option value="other">Інше</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Опис проблеми
                    </label>
                    <textarea
                      value={reportForm.description}
                      onChange={(e) =>
                        setReportForm((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className="input-field resize-none"
                      rows="4"
                      placeholder="Опишіть проблему детальніше..."
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Контактна інформація (необов&apos;язково)
                    </label>
                    <input
                      type="text"
                      value={reportForm.contactInfo}
                      onChange={(e) =>
                        setReportForm((prev) => ({ ...prev, contactInfo: e.target.value }))
                      }
                      className="input-field"
                      placeholder="Email або телефон"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowReportModal(false)}
                      className="flex-1 btn-secondary"
                    >
                      Скасувати
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Надіслати
                    </button>
                  </div>
                </form>
              </>
            ),
          })}

        {showChangeModal &&
          selectedShelterForChange &&
          ModalShell({
            title: 'Пропозиція зміни',
            onClose: () => setShowChangeModal(false),
            icon: Sparkles,
            children: (
              <>
                <div className="mb-4 p-4 bg-gray-50 dark:bg-dark-border rounded-2xl border border-gray-200 dark:border-dark-border">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {selectedShelterForChange.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedShelterForChange.address}
                  </p>
                </div>

                <form onSubmit={handleChangeSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Новий опис
                    </label>
                    <textarea
                      value={changeForm.description}
                      onChange={(e) =>
                        setChangeForm((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className="input-field resize-none"
                      rows="4"
                      placeholder="Що саме варто оновити?"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Нова місткість
                    </label>
                    <input
                      type="number"
                      value={changeForm.capacity}
                      onChange={(e) =>
                        setChangeForm((prev) => ({ ...prev, capacity: e.target.value }))
                      }
                      className="input-field"
                      placeholder="Наприклад: 300"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Зручності (через кому)
                    </label>
                    <input
                      type="text"
                      value={changeForm.amenities}
                      onChange={(e) =>
                        setChangeForm((prev) => ({ ...prev, amenities: e.target.value }))
                      }
                      className="input-field"
                      placeholder="вода, туалет, світло"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowChangeModal(false)
                        setSelectedShelterForChange(null)
                        setChangeForm({ description: '', capacity: '', amenities: '' })
                      }}
                      className="flex-1 btn-secondary"
                    >
                      Скасувати
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Надіслати
                    </button>
                  </div>
                </form>
              </>
            ),
          })}

        {showReviewModal &&
          selectedShelterForReview &&
          ModalShell({
            title: 'Залишити відгук',
            onClose: () => {
              setShowReviewModal(false)
              setSelectedShelterForReview(null)
              setReviewForm({ rating: 5, comment: '' })
            },
            icon: Star,
            children: (
              <>
                <div className="mb-4 p-4 bg-gray-50 dark:bg-dark-border rounded-2xl border border-gray-200 dark:border-dark-border">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {selectedShelterForReview.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedShelterForReview.address}
                  </p>
                </div>

                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Оцінка
                    </label>
                    <div className="flex items-center gap-2">
                      {[5, 4, 3, 2, 1].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setReviewForm((prev) => ({ ...prev, rating: value }))}
                          className="p-1"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              reviewForm.rating >= value
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Коментар
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm((prev) => ({ ...prev, comment: e.target.value }))
                      }
                      className="input-field resize-none"
                      rows="4"
                      placeholder="Що вам сподобалось або що можна покращити?"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowReviewModal(false)
                        setSelectedShelterForReview(null)
                        setReviewForm({ rating: 5, comment: '' })
                      }}
                      className="flex-1 btn-secondary"
                    >
                      Скасувати
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
                    >
                      <Star className="w-4 h-4" />
                      Надіслати
                    </button>
                  </div>
                </form>
              </>
            ),
          })}

        {showAddShelterModal &&
          ModalShell({
            title: 'Додати укриття',
            onClose: () => setShowAddShelterModal(false),
            icon: Plus,
            children: (
              <form onSubmit={handleAddShelterSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Назва укриття *
                  </label>
                  <input
                    type="text"
                    value={addShelterForm.name}
                    onChange={(e) =>
                      setAddShelterForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="input-field"
                    placeholder="Наприклад: Укриття ЖК 'Сонячний'"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Адреса *
                  </label>
                  <input
                    type="text"
                    value={addShelterForm.address}
                    onChange={(e) =>
                      setAddShelterForm((prev) => ({ ...prev, address: e.target.value }))
                    }
                    className="input-field"
                    placeholder="Вулиця, будинок"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Тип укриття *
                  </label>
                  <select
                    value={addShelterForm.category}
                    onChange={(e) =>
                      setAddShelterForm((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="input-field"
                    required
                  >
                    <option value="укриття">🛡️ Укриття</option>
                    <option value="метро">🚇 Метро</option>
                    <option value="сховище">🏠 Сховище</option>
                    <option value="бункер">🏚️ Бункер</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Місткість (осіб)
                  </label>
                  <input
                    type="number"
                    value={addShelterForm.capacity}
                    onChange={(e) =>
                      setAddShelterForm((prev) => ({ ...prev, capacity: e.target.value }))
                    }
                    className="input-field"
                    placeholder="Наприклад: 150"
                    min="1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Опис
                  </label>
                  <textarea
                    value={addShelterForm.description}
                    onChange={(e) =>
                      setAddShelterForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="input-field resize-none"
                    rows="4"
                    placeholder="Коротко опишіть укриття..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Зручності
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['вода', 'туалет', 'вентиляція', 'світло', 'аптечка', 'пандус'].map(
                      (amenity) => (
                        <label
                          key={amenity}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-dark-border"
                        >
                          <input
                            type="checkbox"
                            checked={addShelterForm.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {userLocation && (
                  <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-900/40">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Координати будуть встановлені за вашим місцезнаходженням
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddShelterModal(false)}
                    className="flex-1 btn-secondary"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Додати
                  </button>
                </div>
              </form>
            ),
          })}

        {showReportsModal &&
          createPortal(
            <div className="fixed inset-0 bg-black/55 backdrop-blur-[2px] flex items-center justify-center z-[9999] p-4">
              <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-border relative z-[10000]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-300" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Скарги на укриття ({reports.length})
                      </h3>
                    </div>

                    <button
                      onClick={() => setShowReportsModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {reports.length > 0 ? (
                      reports.map((report) => {
                        const shelter = allShelters.find((item) => item.id === report.shelterId)

                        return (
                          <div
                            key={report.id}
                            className="border border-gray-200 dark:border-dark-border rounded-2xl p-5 bg-gray-50/70 dark:bg-slate-900/40"
                          >
                            <div className="flex items-start justify-between mb-2 gap-3">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {shelter?.name || 'Невідоме укриття'}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {shelter?.address || 'Адреса невідома'}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                                    report.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  }`}
                                >
                                  {report.status === 'pending' ? 'Очікує' : 'Вирішено'}
                                </span>

                                <button
                                  onClick={() => removeReport(report.id)}
                                  className="p-1.5 text-red-500 hover:text-red-700"
                                  title="Видалити скаргу"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Тип проблеми:
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                                {report.type === 'missing'
                                  ? 'Укриття відсутнє'
                                  : report.type === 'closed'
                                    ? 'Укриття зачинене'
                                    : report.type === 'inaccessible'
                                      ? 'Недоступне для людей з інвалідністю'
                                      : report.type === 'incorrect_info'
                                        ? 'Неправильна інформація'
                                        : 'Інше'}
                              </span>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {report.description}
                            </p>

                            {report.contactInfo && (
                              <p className="text-sm text-blue-600 dark:text-blue-400">
                                Контакт: {report.contactInfo}
                              </p>
                            )}

                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                              {new Date(report.timestamp).toLocaleString('uk-UA')}
                            </p>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">Немає скарг на укриття</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}

        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                    <Shield className="w-4 h-4" />
                    Інтерактивна карта безпечних місць
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Карта укриттів
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Пошук, фільтрація, маршрут і швидкий доступ до важливих локацій
                  </p>
                </div>

                {reports.length > 0 && (
                  <button
                    onClick={() => setShowReportsModal(true)}
                    className="px-4 py-2.5 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition-colors flex items-center gap-2 w-fit shadow-sm"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Скарги ({reports.length})
                  </button>
                )}
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col xl:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Пошук за назвою або адресою..."
                    className="input-field pl-10 shadow-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setFavoritesOnly((prev) => !prev)}
                    className={`px-4 py-3 rounded-2xl transition-colors font-medium inline-flex items-center gap-2 shadow-sm ${
                      favoritesOnly
                        ? 'bg-pink-600 text-white'
                        : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    Лише обрані
                  </button>

                  <div className="relative">
                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input-field pl-10 min-w-[190px] shadow-sm"
                    >
                      <option value="distance">Сортування: відстань</option>
                      <option value="rating">Сортування: рейтинг</option>
                      <option value="capacity">Сортування: місткість</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2 shadow-sm"
                  >
                    <Filter className="w-5 h-5" />
                    <span className="hidden sm:inline">Фільтри</span>
                  </button>
                </div>
              </form>

              {(searchInput || selectedCategory || favoritesOnly) && (
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('')
                      setSelectedCategory(null)
                      setFavoritesOnly(false)
                    }}
                    className="px-4 py-2.5 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    <X className="w-4 h-4" />
                    Скинути фільтри
                  </button>
                </div>
              )}

              {showFilters && (
                <div className="card mb-6 border border-gray-200/80 dark:border-dark-border shadow-sm rounded-3xl">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-4 py-2 rounded-2xl transition-colors ${
                        selectedCategory === null
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-dark-border text-gray-900 dark:text-gray-300'
                      }`}
                    >
                      Всі
                    </button>

                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-2xl transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-dark-border text-gray-900 dark:text-gray-300'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {userLocation ? (
                    <div className="mt-5 space-y-3">
                      <button
                        onClick={clearLocation}
                        className="w-full px-6 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors font-medium"
                      >
                        🗑️ Очистити моє місцезнаходження
                      </button>

                      <button
                        onClick={handleAddShelter}
                        className="w-full px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                      >
                        <Plus className="w-5 h-5" />
                        Додати укриття
                      </button>

                      <p className="text-sm text-green-600 dark:text-green-400 text-center">
                        ✅ Місцезнаходження встановлено
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={getLocation}
                      disabled={locationLoading}
                      className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium flex items-center gap-2"
                    >
                      {locationLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Отримання...
                        </>
                      ) : (
                        '📍 Мої укриття поблизу'
                      )}
                    </button>
                  )}

                  {locationError && (
                    <p className="mt-3 text-sm text-red-600 dark:text-red-400">{locationError}</p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div
                  className="bg-white dark:bg-dark-card rounded-3xl shadow-lg overflow-hidden border border-gray-200/70 dark:border-dark-border"
                  style={{ height: '600px' }}
                >
                  <MapContainerWrapper
                    userLocation={userLocation}
                    filteredShelters={filteredShelters}
                    focusedShelter={focusedShelter}
                    onReviewShelter={handleReviewShelter}
                    onNavigate={handleNavigate}
                    onReportShelter={handleReportShelter}
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-dark-card rounded-3xl shadow-lg border border-gray-200/70 dark:border-dark-border overflow-hidden">
                  <div className="p-5 border-b border-gray-200 dark:border-dark-border bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Укриття ({filteredShelters.length})
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Оберіть картку, щоб швидко сфокусувати карту на потрібній точці
                    </p>
                  </div>

                  <div className="p-4 space-y-4 max-h-[820px] overflow-y-auto">
                    {filteredShelters.length > 0 ? (
                      filteredShelters.map((shelter) => (
                        <ShelterCard
                          key={shelter.id}
                          shelter={shelter}
                          showDistance={Boolean(userLocation)}
                          onClick={() => handleShelterClick(shelter)}
                          onReport={handleReportShelter}
                          onReview={handleReviewShelter}
                          onSuggestChange={handleSuggestChange}
                          reportsCount={getShelterReportsCount(shelter.id)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12 px-4">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                          <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Укриттів не знайдено
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MapErrorBoundary>
  )
}