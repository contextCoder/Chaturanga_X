import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#press">Press</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li><a href="#forum">Forum</a></li>
            <li><a href="#clubs">Clubs</a></li>
            <li><a href="#tournaments">Tournaments</a></li>
            <li><a href="#leaderboard">Leaderboard</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Learning</h4>
          <ul>
            <li><a href="#lessons">Lessons</a></li>
            <li><a href="#puzzles">Puzzles</a></li>
            <li><a href="#videos">Videos</a></li>
            <li><a href="#training">Training</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#instagram">Instagram</a></li>
            <li><a href="#youtube">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 ChaturangaX. All rights reserved.</p>
      </div>
    </footer>
  );
}
