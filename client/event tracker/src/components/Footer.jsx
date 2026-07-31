function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <small>
          © {new Date().getFullYear()} Campus Event Tracker & RSVP Portal.
          All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;