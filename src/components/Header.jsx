import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <span className="chess-piece">♞</span>
            <h1>ChaturangaX</h1>
          </div>
        </div>

        {isHomePage && (
          <nav className="nav-menu">
            <a href="#play" className="nav-link">Play</a>
            <a href="#learn" className="nav-link">Learn</a>
            <a href="#community" className="nav-link">Community</a>
            <a href="#about" className="nav-link">About</a>
          </nav>
        )}

        <div className="header-actions">
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
        </div>
      </div>
    </header>
  );
}
