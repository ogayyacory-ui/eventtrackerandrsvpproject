import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          Campus Event Tracker
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>

          <Link
            to="/"
            className="nav-link"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/events"
            className="nav-link"
            onClick={closeMenu}
          >
            Events
          </Link>

          {user && (
            <>
              <Link
                to="/my-rsvps"
                className="nav-link"
                onClick={closeMenu}
              >
                My RSVPs
              </Link>

              <Link
                to="/profile"
                className="nav-link"
                onClick={closeMenu}
              >
                Profile
              </Link>
            </>
          )}

          {(user?.role === "organizer" ||
            user?.role === "admin") && (
            <Link
              to="/dashboard"
              className="nav-link"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          )}

          {user && (
            <span className="user-badge">
              {user.username} ({user.role})
            </span>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="nav-link"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              className="logout-btn"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;