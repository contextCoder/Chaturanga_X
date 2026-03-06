import './CTA.css';

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2>Ready to Level Up Your Chess Game?</h2>
        <p>Join millions of players and start your chess journey today</p>
        <div className="cta-buttons">
          <button className="cta-btn primary">Play for Free</button>
          <button className="cta-btn secondary">Premium Membership</button>
        </div>
      </div>
    </section>
  );
}
