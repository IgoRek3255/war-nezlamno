import { useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useShelterStore } from './store'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Map from './pages/Map'
import Favorites from './pages/Favorites'
import AboutUs from './pages/AboutUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import UserAgreement from './pages/UserAgreement'
import Admin from './pages/Admin'

export default function App() {
  const { darkMode } = useShelterStore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<UserAgreement />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
