import { useState, useEffect } from 'react'
import ReservationBoard from './ReservationBoard'
import './AdminDashboard.css'

export default function AdminDashboard({ isOpen, onClose, reservations, onMoveReservation }) {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const ADMIN_PASSWORD = 'shanghai123'

  // Zablokovat scroll stránky když je modal otevřený
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('Nesprávné heslo!')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    onClose() // Vrátí se na hlavní stránku
  }

  const totalReservations = reservations.length
  const getTodayReservations = () => {
    const today = new Date().toISOString().split('T')[0]
    return reservations
      .filter(res => res.date === today)
      .sort((a, b) => {
        // Seřadit podle času od nejranějšího k nejpozdějšímu
        const timeA = a.time.padStart(5, '0')
        const timeB = b.time.padStart(5, '0')
        return timeA.localeCompare(timeB)
      })
  }
  const todayReservations = getTodayReservations().length

  if (!isOpen) return null

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <h1>
            <span className="admin-title-full">👨‍💼 Admin Panel - Správa Rezervací</span>
            <span className="admin-title-short">👨‍💼 Admin</span>
          </h1>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {!isAuthenticated ? (
          <div className="login-container">
            <h2>Přihlášení</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="password">Heslo:</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Zadejte heslo"
                    autoFocus
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>
              </div>
              <button type="submit" className="login-btn">Přihlásit se</button>
            </form>
            <p className="hint">Hint: Slovo z názvu restaurace + číslo 123</p>
          </div>
        ) : (
          <div className="dashboard-content">
            <div className="dashboard-toolbar">
              <div className="stats">
                <div className="stat-item">
                  <span className="stat-label">Celkem rezervací:</span>
                  <span className="stat-value">{totalReservations}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Dnes:</span>
                  <span className="stat-value">{todayReservations}</span>
                </div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Odhlásit se
              </button>
            </div>

            <ReservationBoard
              reservations={getTodayReservations()}
              onMoveReservation={onMoveReservation}
            />
          </div>
        )}
      </div>
    </div>
  )
}
