import { useMemo, useState } from 'react'
import { useShelterStore } from '../store'
import {
  CheckCircle2,
  XCircle,
  UserCheck,
  ClipboardList,
  ShieldCheck,
  Lock,
  FileWarning,
} from 'lucide-react'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'demo-admin'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('reports')
  const [error, setError] = useState('')

  const {
    isAdmin,
    setAdmin,
    reports,
    updateReport,
    shelterRequests,
    approveShelterRequest,
    rejectShelterRequest,
    getShelterById,
  } = useShelterStore()

  const sortedReports = useMemo(() => {
    return [...reports].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }, [reports])

  const handleLogin = (e) => {
    e.preventDefault()

    if (password === ADMIN_PASSWORD) {
      setAdmin(true)
      setError('')
    } else {
      setError('Невірний пароль. Спробуйте ще раз.')
    }
  }

  const handleLogout = () => {
    setAdmin(false)
    setPassword('')
    setError('')
  }

  const handleMarkResolved = (id) => {
    updateReport(id, { status: 'resolved' })
  }

  const handleMarkDismissed = (id) => {
    updateReport(id, { status: 'dismissed' })
  }

  const getShelterName = (id) => {
    const shelter = getShelterById(id)
    return shelter ? shelter.name : 'Не знайдено'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            <ShieldCheck className="w-4 h-4" />
            Панель керування платформою
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Адмін-панель</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Обробка скарг, перевірка нових запитів та модерація інформації про укриття.
              </p>
            </div>

            {isAdmin && (
              <button onClick={handleLogout} className="btn-secondary w-fit">
                Вийти
              </button>
            )}
          </div>
        </div>

        {!isAdmin ? (
          <div className="max-w-lg mx-auto">
            <div className="bg-white dark:bg-dark-card rounded-3xl shadow-lg border border-gray-200 dark:border-dark-border p-8">
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-2">
                Увійдіть як адміністратор
              </h2>

              <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                Для демо-режиму використовується пароль з середовища або локальний тестовий пароль.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Пароль
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="Введіть пароль адміністратора"
                  />
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                    {error}
                  </div>
                )}

                <button type="submit" className="btn-primary w-full">
                  Увійти
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card rounded-3xl border border-gray-200/70 dark:border-dark-border">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Активні скарги</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {reports.filter((report) => report.status === 'pending').length}
                </p>
              </div>

              <div className="card rounded-3xl border border-gray-200/70 dark:border-dark-border">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Усі скарги</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{reports.length}</p>
              </div>

              <div className="card rounded-3xl border border-gray-200/70 dark:border-dark-border">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Запити на модерацію</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {shelterRequests.length}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-5 py-3 rounded-2xl font-semibold transition ${
                  activeTab === 'reports'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300'
                }`}
              >
                <ClipboardList className="w-4 h-4 inline mr-2" />
                Скарги ({reports.length})
              </button>

              <button
                onClick={() => setActiveTab('requests')}
                className={`px-5 py-3 rounded-2xl font-semibold transition ${
                  activeTab === 'requests'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300'
                }`}
              >
                <UserCheck className="w-4 h-4 inline mr-2" />
                Запити ({shelterRequests.length})
              </button>
            </div>

            {activeTab === 'reports' && (
              <div className="bg-white dark:bg-dark-card rounded-3xl shadow-lg border border-gray-200 dark:border-dark-border p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Скарги
                </h2>

                {sortedReports.length === 0 ? (
                  <div className="text-center py-10">
                    <FileWarning className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 dark:text-gray-300">Немає нових скарг.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedReports.map((report) => (
                      <div
                        key={report.id}
                        className="border border-gray-200 dark:border-dark-border rounded-2xl p-5"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              <strong>Укриття:</strong> {getShelterName(report.shelterId)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              <strong>Тип:</strong> {report.type}
                            </p>
                          </div>

                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-200 w-fit">
                            {report.status}
                          </span>
                        </div>

                        <p className="mt-3 text-gray-800 dark:text-gray-200">
                          {report.description}
                        </p>

                        {report.contactInfo && (
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Контакт: {report.contactInfo}
                          </p>
                        )}

                        <p className="mt-2 text-xs text-gray-400">
                          {new Date(report.timestamp).toLocaleString()}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => handleMarkResolved(report.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Вирішено
                          </button>

                          <button
                            onClick={() => handleMarkDismissed(report.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                          >
                            <XCircle className="w-4 h-4" />
                            Відхилити
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="bg-white dark:bg-dark-card rounded-3xl shadow-lg border border-gray-200 dark:border-dark-border p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Запити на додавання/зміну укриттів
                </h2>

                {shelterRequests.length === 0 ? (
                  <div className="text-center py-10">
                    <FileWarning className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 dark:text-gray-300">Немає запитів.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {shelterRequests.map((req) => (
                      <div
                        key={req.id}
                        className="border border-gray-200 dark:border-dark-border rounded-2xl p-5"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between gap-3">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              <strong>Тип запиту:</strong> {req.type === 'add' ? 'Додавання' : 'Оновлення'}
                            </p>

                            {req.payload ? (
                              <>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  <strong>Укриття:</strong> {req.payload.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  <strong>Адреса:</strong> {req.payload.address}
                                </p>
                              </>
                            ) : (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>ID укриття:</strong> {req.shelterId}
                              </p>
                            )}
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-gray-400">
                              {new Date(req.timestamp).toLocaleString()}
                            </p>
                            <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-200">
                              {req.status || 'pending'}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => approveShelterRequest(req.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Підтвердити
                          </button>

                          <button
                            onClick={() => rejectShelterRequest(req.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                          >
                            <XCircle className="w-4 h-4" />
                            Відхилити
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
