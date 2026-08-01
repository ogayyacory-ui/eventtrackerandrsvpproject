function Footer() {
  return (
    <footer style={{ background: "#0b1f33", color: "#b9cad6", padding: "22px 16px", textAlign: "center" }}>
      <div>
        <small style={{ fontSize: ".82rem" }}>
          © {new Date().getFullYear()} Campus Event Tracker & RSVP Portal.
          All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
