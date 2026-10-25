import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/AdminRegister.css";

function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Admin account creation functionality needs to be connected.");
  };

  return (
    <div className="eventora-admin-register-page">
      <div className="admin-register-background-shape admin-register-shape-one"></div>
      <div className="admin-register-background-shape admin-register-shape-two"></div>

      <div className="admin-register-wrapper">
        <div className="admin-register-card">
          {/* LEFT VISUAL PANEL */}
          <div className="admin-register-visual-panel">
            <div className="admin-register-visual-content">
              <Link to="/" className="admin-register-brand">
                <span className="admin-register-brand-icon">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <span>Eventora</span>
              </Link>

              <div className="admin-register-visual-heading">
                <span className="admin-register-eyebrow">
                  <span className="admin-register-eyebrow-dot"></span>
                  ADMINISTRATION PORTAL
                </span>

                <h1>
                  Build your team.
                  <br />
                  <span>Manage with confidence.</span>
                </h1>

                <p>
                  Create an administrator account to manage events, oversee
                  users, and keep your Eventora platform organized.
                </p>
              </div>

              <div className="admin-register-feature-list">
                <div className="admin-register-feature">
                  <div className="admin-register-feature-icon">
                    <i className="bi bi-calendar2-check"></i>
                  </div>

                  <div>
                    <h6>Manage Events</h6>
                    <p>Keep every event organized and on track.</p>
                  </div>
                </div>

                <div className="admin-register-feature">
                  <div className="admin-register-feature-icon">
                    <i className="bi bi-people"></i>
                  </div>

                  <div>
                    <h6>Oversee Users</h6>
                    <p>Manage user accounts from one place.</p>
                  </div>
                </div>

                <div className="admin-register-feature">
                  <div className="admin-register-feature-icon">
                    <i className="bi bi-shield-lock"></i>
                  </div>

                  <div>
                    <h6>Protected Access</h6>
                    <p>Keep administrative access restricted.</p>
                  </div>
                </div>
              </div>

              <div className="admin-register-floating-icon admin-register-floating-one">
                <i className="bi bi-gear"></i>
              </div>

              <div className="admin-register-floating-icon admin-register-floating-two">
                <i className="bi bi-stars"></i>
              </div>
            </div>

            <div className="admin-register-visual-footer">
              <span>MAKING EVERY MOMENT COUNT</span>
              <span>© {new Date().getFullYear()} Eventora</span>
            </div>
          </div>

          {/* RIGHT REGISTRATION PANEL */}
          <div className="admin-register-form-panel">
            <Link to="/" className="admin-register-mobile-brand">
              <span className="admin-register-mobile-brand-icon">
                <i className="bi bi-calendar-event"></i>
              </span>
              Eventora
            </Link>

            <div className="admin-register-form-content">
              <div className="admin-register-main-icon">
                <i className="bi bi-person-lock"></i>
              </div>

              <div className="admin-register-heading">
                <span className="admin-register-form-badge">
                  <i className="bi bi-shield-check me-2"></i>
                  ADMIN ACCOUNT SETUP
                </span>

                <h2>Create Admin Account</h2>

                <p>Enter your details to set up an administrator account.</p>
              </div>

              <form className="admin-register-form" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="admin-register-field">
                  <label htmlFor="admin-register-name">Full Name</label>

                  <div className="admin-register-input-wrapper">
                    <i className="bi bi-person admin-register-input-icon"></i>

                    <input
                      type="text"
                      id="admin-register-name"
                      name="fullName"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="admin-register-field">
                  <label htmlFor="admin-register-email">Email Address</label>

                  <div className="admin-register-input-wrapper">
                    <i className="bi bi-envelope admin-register-input-icon"></i>

                    <input
                      type="email"
                      id="admin-register-email"
                      name="email"
                      placeholder="admin@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="admin-register-field">
                  <label htmlFor="admin-register-phone">Phone Number</label>

                  <div className="admin-register-input-wrapper">
                    <i className="bi bi-telephone admin-register-input-icon"></i>

                    <input
                      type="tel"
                      id="admin-register-phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      pattern="[0-9+\-\s()]{7,20}"
                      title="Enter a valid phone number."
                      required
                    />
                  </div>
                </div>

                {/* Admin Access Key */}
                <div className="admin-register-field">
                  <label htmlFor="admin-access-key">Admin Access Key</label>

                  <div className="admin-register-input-wrapper">
                    <i className="bi bi-key admin-register-input-icon"></i>

                    <input
                      type="password"
                      id="admin-access-key"
                      name="accessKey"
                      placeholder="Enter your authorized access key"
                      autoComplete="off"
                      required
                    />
                  </div>

                  <small className="admin-register-hint">
                    <i className="bi bi-info-circle me-1"></i>
                    An access key must be verified securely by your backend.
                  </small>
                </div>

                {/* Password */}
                <div className="admin-register-field">
                  <label htmlFor="admin-register-password">Password</label>

                  <div className="admin-register-input-wrapper">
                    <i className="bi bi-lock admin-register-input-icon"></i>

                    <input
                      type={showPassword ? "text" : "password"}
                      id="admin-register-password"
                      name="password"
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="admin-register-password-toggle"
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

                  <small className="admin-register-hint">
                    Use at least 8 characters.
                  </small>
                </div>

                {/* Confirm Password */}
                <div className="admin-register-field">
                  <label htmlFor="admin-register-confirm-password">
                    Confirm Password
                  </label>

                  <div className="admin-register-input-wrapper">
                    <i className="bi bi-shield-lock admin-register-input-icon"></i>

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="admin-register-confirm-password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="admin-register-password-toggle"
                      onClick={() =>
                        setShowConfirmPassword((previous) => !previous)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      <i
                        className={
                          showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"
                        }
                      ></i>
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="admin-register-terms">
                  <label className="admin-register-terms-label">
                    <input type="checkbox" name="terms" required />

                    <span className="admin-register-custom-checkbox"></span>

                    <span>
                      I agree to the <Link to="/terms">Terms & Conditions</Link>{" "}
                      and <Link to="/privacy">Privacy Policy</Link>.
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button type="submit" className="admin-register-submit-btn">
                  <span>Create Admin Account</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>

              <div className="admin-register-divider">
                <span>ALREADY AN ADMIN?</span>
              </div>

              <div className="admin-register-login-section">
                <p>Already have an administrator account?</p>

                <Link to="/admin-login" className="admin-register-login-link">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Admin Login
                </Link>
              </div>

              <div className="admin-register-security">
                <i className="bi bi-shield-check me-2"></i>
                Administrator access should be authorized and verified.
              </div>

              <div className="admin-register-footer">
                <Link to="/" className="admin-register-home-link">
                  <i className="bi bi-house-door me-1"></i>
                  Back to Home
                </Link>

                <span>© {new Date().getFullYear()} Eventora</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
