function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <p className="footer-text">
          © {new Date().getFullYear()} Campus Event Tracker & RSVP Portal
        </p>

        <p className="footer-subtext">
          Built  by the Campus Event Tracker Team. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;