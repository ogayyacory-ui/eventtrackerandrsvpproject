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
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow">
        <div className="card-body p-4">

          <h2 className="text-center mb-4">Login</h2>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100">
              Login
            </button>

          </form>

          <p className="text-center mt-3">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;