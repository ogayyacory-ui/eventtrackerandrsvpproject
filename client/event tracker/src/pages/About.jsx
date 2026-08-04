import { Link } from "react-router-dom";

function About() {
  return (
    <main className="info-page">
      <section className="info-hero">
        <p className="section-kicker">About us</p>
        <h1>Campus life happens when we show up.</h1>
        <p>Campus Event Tracker brings students, clubs, and organizers together around the moments that make university memorable.</p>
      </section>
      <section className="info-content">
        <article className="info-story">
          <p className="section-kicker">Our mission</p>
          <h2>Make it easier to find your people.</h2>
          <p>From workshops and career fairs to sport, music, and club meetings, campus is full of opportunities. We make those opportunities simple to discover and even easier to join.</p>
          <p>Students can explore upcoming events and RSVP in seconds. Organizers get one place to share events and keep their community informed.</p>
          <Link className="info-action" to="/events">Explore events <span>→</span></Link>
        </article>
        <div className="info-values">
          <article><span>01</span><h3>Discover</h3><p>See what is happening across campus in one clear calendar.</p></article>
          <article><span>02</span><h3>Connect</h3><p>Find communities and experiences that match your interests.</p></article>
          <article><span>03</span><h3>Belong</h3><p>Turn an invitation into a campus memory worth keeping.</p></article>
        </div>
      </section>
    </main>
  );
}

export default About;
