import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="../../src/assets/logos/pycamp-logo-white.webp" alt="PyCamp España" />
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link active">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/event" className="navbar-link">
              Próximo PyCamp
            </Link>
          </li>
          <li>
            <Link to="/previous-editions" className="navbar-link">
              Ediciones anteriores
            </Link>
          </li>
          <li>
            <Link to="/diversity" className="navbar-link">
              Código de conducta
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
