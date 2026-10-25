import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/AdminLogin.css";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Admin login functionality needs to be connected.");
  };

  return (
    <div className="eventora-admin-page">
      {/* Background Decorations */}
      <div className="admin-background-shape admin-shape-one"></div>
      <div className="admin-background-shape admin-shape-two"></div>

      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          {/* LEFT VISUAL PANEL */}
          <div className="admin-visual-panel">
            <div className="admin-visual-content">
              <Link to="/" className="admin-brand">
                <span className="admin-brand-icon">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <span>Eventora</span>
              </Link>

              <div className="admin-visual-heading">
                <span className="admin-eyebrow">
                  <span className="admin-eyebrow-dot"></span>
                  ADMINISTRATION PORTAL
                </span>

                <h1>
                  Manage every
                  <br />
                  <span>moment with ease.</span>
                </h1>

                <p>
                  Welcome to the Eventora administration portal. Sign in to
                  manage events, oversee users, and keep everything running
                  smoothly.
                </p>
              </div>

              {/* Admin Features */}
              <div className="admin-feature-list">
                <div className="admin-feature">
                  <div className="admin-feature-icon">
                    <i className="bi bi-calendar2-check"></i>
                  </div>

                  <div>
                    <h6>Event Management</h6>
                    <p>Oversee events and keep plans organized.</p>
                  </div>
                </div>

                <div className="admin-feature">
                  <div className="admin-feature-icon">
                    <i className="bi bi-people"></i>
                  </div>

                  <div>
                    <h6>User Management</h6>
                    <p>Manage accounts and user activity.</p>
                  </div>
                </div>

                <div className="admin-feature">
                  <div className="admin-feature-icon">
                    <i className="bi bi-shield-check"></i>
                  </div>

                  <div>
                    <h6>Secure Administration</h6>
                    <p>Keep your administration access protected.</p>
                  </div>
                </div>
              </div>

              {/* Decorative Icons */}
              <div className="admin-floating-icon admin-floating-one">
                <i className="bi bi-gear"></i>
              </div>

              <div className="admin-floating-icon admin-floating-two">
                <i className="bi bi-stars"></i>
              </div>
            </div>

            <div className="admin-visual-footer">
              <span>MAKING EVERY MOMENT COUNT</span>
              <span>© {new Date().getFullYear()} Eventora</span>
            </div>
          </div>

          {/* RIGHT LOGIN PANEL */}
          <div className="admin-form-panel">
            {/* Mobile Brand */}
            <Link to="/" className="admin-mobile-brand">
              <span className="admin-mobile-brand-icon">
                <i className="bi bi-calendar-event"></i>
              </span>
              Eventora
            </Link>

            <div className="admin-form-content">
              {/* Admin Icon */}
              <div className="admin-main-icon">
                <i className="bi bi-person-lock"></i>
              </div>

              {/* Heading */}
              <div className="admin-form-heading">
                <span className="admin-form-badge">
                  <i className="bi bi-shield-lock me-2"></i>
                  ADMIN ACCESS
                </span>

                <h2>Welcome Back, Admin</h2>

                <p>
                  Sign in with your administrator credentials to access the
                  management portal.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="admin-login-form">
                {/* Email */}
                <div className="admin-field-group">
                  <label htmlFor="admin-email">Email Address</label>

                  <div className="admin-input-wrapper">
                    <i className="bi bi-envelope admin-input-icon"></i>

                    <input
                      type="email"
                      id="admin-email"
                      name="email"
                      placeholder="admin@example.com"
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="admin-field-group">
                  <div className="admin-password-label">
                    <label htmlFor="admin-password">Password</label>
                  </div>

                  <div className="admin-input-wrapper">
                    <i className="bi bi-lock admin-input-icon"></i>

                    <input
                      type={showPassword ? "text" : "password"}
                      id="admin-password"
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      className="admin-password-toggle"
                      onClick={() => setShowPassword((previous) => !previous)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <i
                        className={
                          showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                        }
                      ></i>
                    </button>
                  </div>
                </div>
                {/* Remember Me */}
                <div className="admin-form-options">
                  <label className="admin-remember-label">
                    <input type="checkbox" name="rememberMe" />
                    <span className="admin-custom-checkbox"></span>
                    <span>Remember me</span>
                  </label>

                  <Link to="/admin-forgot-password" className="admin-forgot-link">
                    Forgot password?
                  </Link>
                </div>
                
                {/* Submit */}{" "}
                <button type="submit" className="admin-submit-btn">
                  {" "}
                  <span>Sign In to Dashboard</span>{" "}
                  <i className="bi bi-arrow-right"></i>{" "}
                </button>
                {/* Create Admin Account */}
                <div className="admin-create-account">
                  <p>
                    Don't have an admin account?
                    <Link to="/admin-register" className="admin-create-link">
                      Create Admin Account
                      <i className="bi bi-arrow-up-right ms-1"></i>
                    </Link>
                  </p>
                </div>
              </form>

              {/* Divider */}
              <div className="admin-divider">
                <span>AUTHORIZED PERSONNEL ONLY</span>
              </div>

              {/* Security Notice */}
              <div className="admin-security-box">
                <div className="admin-security-icon">
                  <i className="bi bi-shield-check"></i>
                </div>

                <div>
                  <h6>Secure Admin Access</h6>
                  <p>
                    This portal is intended for authorized Eventora
                    administrators only.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="admin-form-footer">
                <Link to="/" className="admin-home-link">
                  <i className="bi bi-house-door me-1"></i>
                  Back to Home
                </Link>

                <Link to="/user-login" className="admin-user-login-link">
                  User Login
                  <i className="bi bi-arrow-up-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
