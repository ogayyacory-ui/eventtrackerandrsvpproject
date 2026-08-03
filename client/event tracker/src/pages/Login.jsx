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

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "35px",
          boxShadow: "0 12px 30px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#1e293b",
          }}
        >
          Login
        </h2>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div>
            <label style={styles.label}>Email Address</label>

            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="student@university.edu"
              required
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Password</label>

            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={styles.passwordInput}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={styles.submitButton}
          >
            Login
          </button>
        </form>

        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  passwordWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    overflow: "hidden",
  },

  passwordInput: {
    flex: 1,
    border: "none",
    padding: "12px 15px",
    outline: "none",
    fontSize: "15px",
  },

  toggleButton: {
    border: "none",
    background: "#2563eb",
    color: "#fff",
    padding: "12px 18px",
    cursor: "pointer",
    fontWeight: "600",
  },

  submitButton: {
    marginTop: "10px",
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Login;