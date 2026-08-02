import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(credentials);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.message?.includes("Network error")
          ? "Unable to reach the backend server. Please make sure the Flask API is running on http://127.0.0.1:5555."
          : err.message || "Login failed."
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>

        {error && <div style={styles.alert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Field */}
          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              style={styles.input}
              value={credentials.email}
              onChange={handleChange}
              placeholder="student@university.edu"
              required
            />
          </div>

          {/* Password Field with View Toggle */}
          <div style={styles.fieldGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                style={styles.inputWithToggle}
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleBtn}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

// Dedicated Styles Object (Matches Register Component styling)
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px 0",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "36px 32px",
    borderRadius: "12px",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
    width: "100%",
    maxWidth: "420px",
    textAlign: "left", // Resets center alignment inherited from App container
    border: "1px solid #e5e7eb",
  },
  heading: {
    fontSize: "1.65rem",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "24px",
    textAlign: "center",
    letterSpacing: "-0.02em",
  },
  alert: {
    padding: "12px 16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    borderRadius: "8px",
    fontSize: "0.875rem",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "0.95rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    color: "#111827",
    boxSizing: "border-box",
    outline: "none",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  inputWithToggle: {
    width: "100%",
    padding: "10px 55px 10px 14px",
    fontSize: "0.95rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    color: "#111827",
    boxSizing: "border-box",
    outline: "none",
  },
  toggleBtn: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    color: "#0d6efd",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    padding: "4px 8px",
  },
  button: {
    marginTop: "6px",
    width: "100%",
    padding: "12px",
    backgroundColor: "#0d6efd",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(13, 110, 253, 0.2)",
    transition: "background-color 0.2s ease",
  },
  footerText: {
    marginTop: "24px",
    fontSize: "0.875rem",
    color: "#6b7280",
    textAlign: "center",
  },
  link: {
    color: "#0d6efd",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;