import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="../../src/assets/logos/pycamp-logo-white.webp" alt="PyCamp España" />
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
            <Link to="/" className="navbar-link active" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/event" className="navbar-link" onClick={closeMenu}>
              Próximo PyCamp
            </Link>
          </li>
          <li>
            <Link to="/previous-editions" className="navbar-link" onClick={closeMenu}>
              Ediciones anteriores
            </Link>
          </li>
          <li>
            <Link to="/diversity" className="navbar-link" onClick={closeMenu}>
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
