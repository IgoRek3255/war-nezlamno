import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SHELTERS_DATA } from './data'

const STORE_NAME = 'shelter-store'
const MAX_RECENT_SHELTERS = 6
const MAX_SEARCH_HISTORY = 8

const safeParse = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

const normalizeRecentIds = (ids = []) => [...new Set(ids)].slice(0, MAX_RECENT_SHELTERS)
const normalizeSearchHistory = (items = []) => [...new Set(items)].slice(0, MAX_SEARCH_HISTORY)

const mergeShelters = (baseShelters, approvedShelters) => {
  const approvedById = new Map(approvedShelters.map((shelter) => [shelter.id, shelter]))

  const mergedBase = baseShelters.map((shelter) =>
    approvedById.has(shelter.id) ? { ...shelter, ...approvedById.get(shelter.id) } : shelter
  )

  const newShelters = approvedShelters.filter(
    (shelter) => !baseShelters.some((baseShelter) => baseShelter.id === shelter.id)
  )

  return [...mergedBase, ...newShelters]
}

export const useShelterStore = create(
  persist(
    (set, get) => ({
      darkMode: false,
      favorites: [],
      searchQuery: '',
      selectedShelter: null,
      userLocation: null,
      reports: [],
      shelterRequests: [],
      approvedShelters: [],
      recentlyViewed: [],
      searchHistory: [],
      isAdmin: false,

      setDarkMode: (isDark) => set({ darkMode: isDark }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      addFavorite: (shelterId) =>
        set((state) => ({
          favorites: [...new Set([...state.favorites, shelterId])],
        })),

      removeFavorite: (shelterId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== shelterId),
        })),

      isFavorite: (shelterId) => get().favorites.includes(shelterId),

      setSearchQuery: (query) => set({ searchQuery: query }),

      addSearchHistory: (query) =>
        set((state) => {
          const normalizedQuery = query.trim()
          if (!normalizedQuery) return {}

          return {
            searchHistory: normalizeSearchHistory([
              normalizedQuery,
              ...state.searchHistory.filter((item) => item !== normalizedQuery),
            ]),
          }
        }),

      clearSearchHistory: () => set({ searchHistory: [] }),

      setSelectedShelter: (shelter) => set({ selectedShelter: shelter }),

      addRecentlyViewed: (shelterId) =>
        set((state) => ({
          recentlyViewed: normalizeRecentIds([
            shelterId,
            ...state.recentlyViewed.filter((id) => id !== shelterId),
          ]),
        })),

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),

      setUserLocation: (location) => set({ userLocation: location }),

      clearSearch: () => set({ searchQuery: '', selectedShelter: null }),

      addReport: (report) =>
        set((state) => ({
          reports: [...state.reports, report],
        })),

      updateReport: (id, updates) =>
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === id ? { ...report, ...updates } : report
          ),
        })),

      removeReport: (id) =>
        set((state) => ({
          reports: state.reports.filter((report) => report.id !== id),
        })),

      addShelterRequest: (request) =>
        set((state) => ({
          shelterRequests: [...state.shelterRequests, request],
        })),

      approveShelterRequest: (id) =>
        set((state) => {
          const request = state.shelterRequests.find((item) => item.id === id)
          if (!request) return {}

          const nextShelterRequests = state.shelterRequests.filter((item) => item.id !== id)
          let nextApprovedShelters = [...state.approvedShelters]

          if (request.type === 'add' && request.payload) {
            nextApprovedShelters = [...nextApprovedShelters, request.payload]
          }

          if (request.type === 'update' && request.shelterId && request.changes) {
            const existingIndex = nextApprovedShelters.findIndex(
              (shelter) => shelter.id === request.shelterId
            )

            const updatePayload = { id: request.shelterId, ...request.changes }

            if (existingIndex >= 0) {
              nextApprovedShelters[existingIndex] = {
                ...nextApprovedShelters[existingIndex],
                ...request.changes,
              }
            } else {
              nextApprovedShelters.push(updatePayload)
            }
          }

          return {
            shelterRequests: nextShelterRequests,
            approvedShelters: nextApprovedShelters,
          }
        }),

      rejectShelterRequest: (id) =>
        set((state) => ({
          shelterRequests: state.shelterRequests.filter((request) => request.id !== id),
        })),

      setAdmin: (isAdmin) => set({ isAdmin }),

      getShelters: () => mergeShelters(SHELTERS_DATA, get().approvedShelters),

      getShelterById: (id) => get().getShelters().find((shelter) => shelter.id === id),

      getRecentShelters: () =>
        get()
          .recentlyViewed.map((id) => get().getShelterById(id))
          .filter(Boolean),
    }),
    {
      name: STORE_NAME,
      deserialize: safeParse,
      partialize: (state) => ({
        darkMode: state.darkMode,
        favorites: state.favorites,
        reports: state.reports,
        shelterRequests: state.shelterRequests,
        approvedShelters: state.approvedShelters,
        recentlyViewed: state.recentlyViewed,
        searchHistory: state.searchHistory,
        isAdmin: state.isAdmin,
      }),
    }
  )
)