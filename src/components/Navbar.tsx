import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏥</span>
          MediSync
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Citas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link nav-link-create">
              + Nueva Cita
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
