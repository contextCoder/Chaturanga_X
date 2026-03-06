import './Features.css';

export default function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Chess',
      description: 'Play fast-paced games with time controls from 1 minute to 60 minutes.'
    },
    {
      icon: '📚',
      title: 'Learn & Improve',
      description: 'Access thousands of lessons, puzzles, and tactics to enhance your skills.'
    },
    {
      icon: '🏆',
      title: 'Compete',
      description: 'Join tournaments and climb the leaderboard against players worldwide.'
    },
    {
      icon: '👥',
      title: 'Community',
      description: 'Connect with millions of chess players and join clubs with shared interests.'
    },
    {
      icon: '📊',
      title: 'Statistics',
      description: 'Track your progress with detailed game analysis and performance metrics.'
    },
    {
      icon: '🎮',
      title: 'Play Computer',
      description: 'Challenge our AI engine with adjustable difficulty levels.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="features-container">
        <div className="features-header">
          <h2>Why Choose ChaturangaX?</h2>
          <p>Everything you need to become a better chess player</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
