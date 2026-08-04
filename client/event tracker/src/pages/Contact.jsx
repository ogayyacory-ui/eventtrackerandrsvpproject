import { useState } from "react";

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event) => { event.preventDefault(); setSent(true); event.currentTarget.reset(); };

  return (
    <main className="info-page">
      <section className="info-hero info-hero-contact">
        <p className="section-kicker">Contact us</p>
        <h1>Let’s make campus more connected.</h1>
        <p>Have a question, suggestion, or need help with an event? Send the team a message.</p>
      </section>
      <section className="contact-layout">
        <aside className="contact-details">
          <p className="section-kicker">Get in touch</p>
          <h2>We would love to hear from you.</h2>
          <p>Tell us how we can help and we will get back to you as soon as possible.</p>
          <a href="mailto:hello@campusevents.edu">hello@campusevents.edu</a>
        </aside>
        <form className="contact-form" onSubmit={handleSubmit}>
          {sent && <p className="contact-success" role="status">Thanks! Your message has been received.</p>}
          <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
          <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
          <label>Message<textarea name="message" placeholder="How can we help?" rows="5" required /></label>
          <button type="submit">Send message <span>→</span></button>
        </form>
      </section>
    </main>
  );
}

export default Contact;
