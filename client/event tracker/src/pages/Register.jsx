import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

const UserMark = () => <span className="auth-user-mark" aria-hidden="true">♟</span>;

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");
    try {
      await register({ username: formData.name, email: formData.email, password: formData.password });
      navigate("/");
    } catch (err) { setError(err.message || "Registration failed."); }
  };

  return (
    <main className="auth-page">
      <div className="auth-glow auth-glow-left" />
      <div className="auth-glow auth-glow-right" />
      <section className="auth-layout auth-layout-register">
        <div className="auth-welcome">
          <p>Join the community</p>
          <h1>Your next experience is waiting.</h1>
          <span>Make plans, meet people, and make campus count.</span>
        </div>
        <section className="auth-card auth-card-register" aria-labelledby="register-title">
          <UserMark />
          <h2 id="register-title">Create account</h2>
          <p className="auth-subtitle">Start discovering what campus has to offer.</p>
          {error && <div className="auth-error" role="alert">{error}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>Full name
              <span className="auth-input-wrap"><span aria-hidden="true">♙</span><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required /></span>
            </label>
            <label>Email address
              <span className="auth-input-wrap"><span aria-hidden="true">✉</span><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required /></span>
            </label>
            <label>Password
              <span className="auth-input-wrap"><span aria-hidden="true">▣</span><input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required /><button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button></span>
            </label>
            <label>Confirm password
              <span className="auth-input-wrap"><span aria-hidden="true">▣</span><input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required /><button type="button" onClick={() => setShowConfirmPassword((value) => !value)}>{showConfirmPassword ? "Hide" : "Show"}</button></span>
            </label>
            <p className="auth-help">New accounts are student accounts. Contact an administrator for organizer access.</p>
            <button className="auth-submit" type="submit">Sign up <span>→</span></button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Log in →</Link></p>
        </section>
      </section>
    </main>
  );
}

export default Register;
