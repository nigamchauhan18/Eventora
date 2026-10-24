import "../../assets/AdminLogin.css";
import { Link } from "react-router-dom";

function AdminLogin() {
  return (
    <div className="admin-login-page container-fluid d-flex justify-content-center align-items-center py-5 px-3">
      {" "}
      <div className="admin-login-wrapper row g-0 shadow-lg">
        {/* LEFT CARD */}
        <div className="col-lg-5">
          <div className="admin-login-left h-100 d-flex flex-column justify-content-between">
            <div>
              <Link to="/" className="admin-login-brand">
                <i className="bi bi-calendar-event me-2"></i>
                Eventora
              </Link>

              <div className="admin-login-intro">
                <span className="admin-login-badge">ADMINISTRATOR PORTAL</span>

                <h1>Manage Every Event in One Place.</h1>

                <p>
                  Welcome to the Eventora administration portal. Sign in to
                  manage events, oversee activities, and keep everything running
                  smoothly.
                </p>
              </div>

              <div className="admin-login-feature">
                <div className="admin-feature-icon">
                  <i className="bi bi-speedometer2"></i>
                </div>

                <div>
                  <h6>Admin Dashboard</h6>
                  <p>Access your event management dashboard.</p>
                </div>
              </div>

              <div className="admin-login-feature">
                <div className="admin-feature-icon">
                  <i className="bi bi-calendar2-check"></i>
                </div>

                <div>
                  <h6>Manage Events</h6>
                  <p>Monitor and organize platform events.</p>
                </div>
              </div>

              <div className="admin-login-feature">
                <div className="admin-feature-icon">
                  <i className="bi bi-shield-lock"></i>
                </div>

                <div>
                  <h6>Secure Access</h6>
                  <p>Access administrative tools securely.</p>
                </div>
              </div>
            </div>

            <div className="admin-login-left-footer">
              <hr />
              <p>© 2026 Eventora. Make every moment count.</p>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="col-lg-7">
          <div className="admin-login-right">
            <div className="admin-login-icon">
              <i className="bi bi-person-lock"></i>
            </div>

            <div className="admin-login-heading">
              <h2>Admin Login</h2>
              <p>Enter your administrator credentials to continue.</p>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                alert("Admin authentication needs to be connected.");
              }}
            >
              {/* EMAIL */}
              <div className="mb-4">
                <label htmlFor="adminEmail" className="form-label">
                  Admin Email Address
                </label>

                <div className="input-group admin-login-input">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>

                  <input
                    type="email"
                    className="form-control"
                    id="adminEmail"
                    name="email"
                    placeholder="Enter your admin email"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label htmlFor="adminPassword" className="form-label">
                  Password
                </label>

                <div className="input-group admin-login-input">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    id="adminPassword"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              {/* REMEMBER AND FORGOT PASSWORD */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberAdmin"
                  />

                  <label className="form-check-label" htmlFor="rememberAdmin">
                    Remember me
                  </label>
                </div>

                <Link to="/forgot-password" className="admin-forgot-link">
                  Forgot Password?
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <button type="submit" className="admin-login-submit">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign In to Dashboard
              </button>
            </form>

            <div className="admin-login-divider">
              <span>Are you an event organizer?</span>
            </div>

            <div className="text-center">
              <Link to="/user-login" className="admin-user-login-link">
                <i className="bi bi-person me-1"></i>
                User Login
              </Link>
            </div>

            <div className="admin-login-bottom">
              <Link to="/">
                <i className="bi bi-arrow-left me-1"></i>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
