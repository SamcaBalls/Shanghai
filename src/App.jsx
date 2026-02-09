import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import OpeningHours from './components/OpeningHours'
import Reservation from './components/Reservation'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import * as reservationApi from './services/reservationApi'
import './App.css'

function App() {
  const [adminOpen, setAdminOpen] = useState(false)
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)

  // Načíst rezervace při spuštění
  useEffect(() => {
    const initApp = async () => {
      // Test connection first
      const connected = await reservationApi.testConnection()
      if (!connected) {
        console.warn('⚠️ Backend server není dostupný')
        alert('Upozornění: Backend server není dostupný na http://localhost:5000. Spusťte: cd server && npm start')
      }
      loadReservations()
    }
    initApp()
  }, [])

  const loadReservations = async () => {
    try {
      setLoading(true)
      const data = await reservationApi.fetchReservations()
      setReservations(data)
    } catch (error) {
      console.error('Chyba při načítání rezervací:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddReservation = async (formData) => {
    try {
      console.log('📝 Odesílám rezervaci:', formData)
      const newReservation = await reservationApi.createReservation(formData)
      console.log('✓ Rezervace přidána:', newReservation)
      setReservations([...reservations, newReservation])
    } catch (error) {
      console.error('❌ Chyba při přidání rezervace:', error)
      // Kapacita / validace – zprávu zobrazí formulář; ostatní chyby = připojení
      if (error.code !== 'CAPACITY_EXCEEDED') {
        alert('Chyba: Nelze se připojit k serveru. Zkontrolujte, zda běží backend na http://localhost:5000')
      }
      throw error
    }
  }

  const handleMoveReservation = async (id, newStatus) => {
    try {
      if (newStatus === 'delete') {
        await reservationApi.deleteReservation(id)
        setReservations(reservations.filter(res => res.id !== id))
      } else {
        const updated = await reservationApi.updateReservationStatus(id, newStatus)
        setReservations(
          reservations.map(res =>
            res.id === id ? updated : res
          )
        )
      }
    } catch (error) {
      console.error('Chyba při aktualizaci rezervace:', error)
    }
  }

  return (
    <div className="app">
      <Header onAdminClick={() => setAdminOpen(true)} />
      <main>
        <Hero />
        <Gallery />
        <OpeningHours />
        <Reservation onReservationSubmit={handleAddReservation} />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      
      <AdminDashboard 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)}
        reservations={reservations}
        onMoveReservation={handleMoveReservation}
        loading={loading}
      />
    </div>
  )
}

export default App
