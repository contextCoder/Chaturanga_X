import { useNavigate } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate('/play');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h2 className="hero-title">Play Chess Online</h2>
          <p className="hero-subtitle">Challenge players from around the world. Play your best game.</p>
          <div className="hero-buttons">
            <button className="btn-play-now" onClick={handlePlayNow}>Play Now</button>
            <button className="btn-learn">Learn Chess</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="chess-board-preview">
            <div className="board">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className={`square ${(Math.floor(i / 8) + (i % 8)) % 2 === 0 ? 'light' : 'dark'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
