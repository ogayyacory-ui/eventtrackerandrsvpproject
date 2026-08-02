import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register({
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account</h2>

        {error && <div style={styles.alert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Full Name */}
          <div style={styles.fieldGroup}>
            <label htmlFor="name" style={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              style={styles.input}
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              placeholder="student@university.edu"
              required
            />
          </div>

          {/* Password with View Toggle */}
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
                value={formData.password}
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

          {/* Confirm Password with View Toggle */}
          <div style={styles.fieldGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <div style={styles.inputWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                style={styles.inputWithToggle}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.toggleBtn}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Account Type */}
          <div style={styles.fieldGroup}>
            <label htmlFor="role" style={styles.label}>
              Account Type
            </label>
            <select
              id="role"
              name="role"
              style={styles.select}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// Dedicated Styles Object
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
    textAlign: "left",
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
  select: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "0.95rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    color: "#111827",
    boxSizing: "border-box",
    outline: "none",
    cursor: "pointer",
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

export default Register;