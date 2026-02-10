import { useState } from 'react'
import './Header.css'

export default function Header({ onAdminClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <a href="#home" className="logo">
          🥢 Shanghai
        </a>
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={menuOpen ? 'active' : ''}>
          <ul>
            <li><a href="#hero" onClick={closeMenu}>Domů</a></li>
            <li><a href="#gallery" onClick={closeMenu}>Galerie</a></li>
            <li><a href="#hours" onClick={closeMenu}>Otevírací doba</a></li>
            <li><a href="#reservation" onClick={closeMenu}>Rezervace</a></li>
            <li><a href="#reviews" onClick={closeMenu}>Recenze</a></li>
            <li><a href="#contact" onClick={closeMenu}>Kontakt</a></li>
          </ul>
        </nav>
        <button className="admin-button" onClick={onAdminClick} title="Admin Panel">
          👨‍💼
        </button>
      </div>
    </header>
  )
}
