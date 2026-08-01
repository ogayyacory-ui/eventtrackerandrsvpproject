
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ background: "#102a43", boxShadow: "0 2px 14px rgba(16,42,67,.16)" }}>
      <div
        style={{
          width: "min(1120px, calc(100% - 32px))",
          minHeight: 68,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <Link
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.08rem",
            letterSpacing: "-.03em",
            textDecoration: "none",
          }}
          to="/"
        >
          Campus Event Tracker
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <Link style={navLink} to="/">
            Home
          </Link>
          <Link style={navLink} to="/events">
            Events
          </Link>

          {user && (
            <>
              <Link style={navLink} to="/my-rsvps">
                My RSVPs
              </Link>
              <Link style={navLink} to="/profile">
                Profile
              </Link>
            </>
          )}

          {user?.role === "organizer" && (
            <Link style={navLink} to="/dashboard">
              Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link style={navLink} to="/login">
                Login
              </Link>
              <Link
                style={{ ...navLink, background: "#2f855a", color: "#fff" }}
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              style={{
                border: "1px solid #93b6c9",
                borderRadius: 8,
                background: "transparent",
                color: "#fff",
                padding: "8px 12px",
                cursor: "pointer",
              }}
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

const navLink = {
  color: "#d9e6ee",
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: 8,
  fontSize: ".93rem",
  fontWeight: 600,
};

export default Navbar;
