import { useEffect, useState } from 'react';
import './Clock.css';

export default function Clock({ initialTime, isActive }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let intervalt;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(intervalt);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`clock `}>
        <div className={`clock-display ${isActive ? 'active' : ''}`}>
          {formatTime(timeLeft)}
        </div>
    </div>
  );
}
