import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

const highlights = [
  ["Discover", "Find academic, social, sports, and club events happening across campus."],
  ["RSVP in seconds", "Save your place and keep every event you are attending in one place."],
  ["Stay connected", "Never miss the workshops, talks, and experiences that matter to you."],
];

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-content">
          <p className="hero-eyebrow">Find your next experience</p>
          <h1>Discover campus events worth showing up for.</h1>
          <p className="hero-copy">
            Explore what is happening on campus, reserve your spot, and make
            every week more memorable.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="hero-primary-action">Explore events <span>→</span></Link>
            <Link to="/register" className="hero-secondary-action">Create an account</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-image-ring">
            <img src={heroImage} alt="" />
          </div>
          <div className="hero-note hero-note-top">✦ New events weekly</div>
          <div className="hero-note hero-note-bottom">Your campus, together</div>
        </div>
        <div className="hero-search-wrap">
          <Link to="/events" className="hero-search" aria-label="Browse campus events">
            <span className="search-icon">⌕</span>
            <span>Search events, clubs, or interests</span>
            <span className="search-button">Search <b>→</b></span>
          </Link>
        </div>
      </section>

      <section className="home-intro">
        <p className="section-kicker">Make campus count</p>
        <div className="intro-heading">
          <h2>More ways to belong.</h2>
          <Link to="/events">View all events <span>→</span></Link>
        </div>
        <div className="highlight-grid">
          {highlights.map(([title, copy], index) => (
            <article className="highlight-card" key={title}>
              <span className="highlight-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div>
          <p className="section-kicker">Ready when you are</p>
          <h2>Your next great campus moment starts here.</h2>
        </div>
        <Link to="/events" className="cta-rsvp">Browse & RSVP <span>→</span></Link>
      </section>
    </div>
  );
}

export default Home;
