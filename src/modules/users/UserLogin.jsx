import { Link } from "react-router-dom";

function UserLogin() {
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light py-4">
      <div
        className="card border-0 shadow p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">
            <i className="bi bi-calendar-event me-2"></i>
            Eventora
          </h2>
          <h4 className="fw-semibold mt-4">Welcome Back!</h4>
          <p className="text-secondary">Login to manage your events.</p>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
              />

              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>

            <Link to="/forgot-password" className="text-decoration-none small">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Login
          </button>
        </form>
        <p className="text-center text-secondary mt-4 mb-0">
          Don't have an account?
          <Link to="/user-register" className="text-decoration-none fw-semibold">
            Sign Up
          </Link>
        </p>
        <div className="text-center mt-3">
          <Link to="/" className="text-decoration-none text-secondary small">
            <i className="bi bi-arrow-left me-1"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
