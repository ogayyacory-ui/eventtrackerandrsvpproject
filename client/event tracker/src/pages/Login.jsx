import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserMark = () => <span className="auth-user-mark" aria-hidden="true">♟</span>;

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setCredentials((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login(credentials);
      navigate("/");
    } catch (err) {
      setError(err.message?.includes("Network error")
        ? "Unable to reach the backend server. Please try again shortly."
        : err.message || "Login failed.");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-glow auth-glow-left" />
      <div className="auth-glow auth-glow-right" />
      <section className="auth-layout">
        <div className="auth-welcome">
          <p>Campus Event Tracker</p>
          <h1>Every campus moment, one place.</h1>
          <span>Discover events. RSVP easily. Stay connected.</span>
        </div>
        <section className="auth-card" aria-labelledby="login-title">
          <UserMark />
          <h2 id="login-title">Welcome back</h2>
          <p className="auth-subtitle">Log in to manage your events and RSVPs.</p>
          {error && <div className="auth-error" role="alert">{error}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>Email address
              <span className="auth-input-wrap"><span aria-hidden="true">✉</span><input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Enter your email" required /></span>
            </label>
            <label>Password
              <span className="auth-input-wrap"><span aria-hidden="true">▣</span><input type={showPassword ? "text" : "password"} name="password" value={credentials.password} onChange={handleChange} placeholder="Enter your password" required /><button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button></span>
            </label>
            <button className="auth-submit" type="submit">Log in <span>→</span></button>
          </form>
          <p className="auth-switch">Not registered yet? <Link to="/register">Sign up →</Link></p>
        </section>
      </section>
    </main>
  );
}

export default Login;
