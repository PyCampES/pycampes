import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoWhite from '../../assets/logos/pycamp-logo-white.webp'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logoWhite} alt="PyCamp España" />
        </Link>
        
        {/* Button Burger */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú de navegación"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navegation menu */}
        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link 
              to="/event" 
              className={`navbar-link ${isActive('/event') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Próximo PyCamp
            </Link>
          </li>
          <li>
            <Link 
              to="/previous-editions" 
              className={`navbar-link ${isActive('/previous-editions') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Ediciones anteriores
            </Link>
          </li>
          <li>
            <Link 
              to="/diversity" 
              className={`navbar-link ${isActive('/diversity') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Código de conducta
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="navbar-overlay" onClick={closeMenu}></div>
      )}
    </nav>
  )
}

export default Navbar
