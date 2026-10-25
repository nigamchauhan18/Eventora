import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/UserLogin.css";

function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="eventora-login-page">
      <div className="login-background-shape login-shape-one"></div>
      <div className="login-background-shape login-shape-two"></div>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-visual-panel">
            <Link to="/" className="login-brand">
              <span className="login-brand-icon">
                <i className="bi bi-calendar-event"></i>
              </span>
              <span>
                Eventora<span className="brand-dot">.</span>
              </span>
            </Link>

            <div className="login-visual-content">
              <span className="login-eyebrow">
                <span className="eyebrow-dot"></span>
                YOUR EVENTS, YOUR WAY
              </span>

              <h1>
                Every great
                <br />
                moment starts
                <br />
                <span>with a plan.</span>
              </h1>

              <p>
                Discover, organize, and manage your events effortlessly. Your
                next unforgettable experience is just around the corner.
              </p>

              <div className="login-visual-stats">
                <div className="visual-stat-icon">
                  <i className="bi bi-calendar2-check"></i>
                </div>

                <div>
                  <h6>Everything in one place</h6>
                  <span>Your events, organized beautifully.</span>
                </div>
              </div>
            </div>

            <div className="login-decoration decoration-calendar">
              <i className="bi bi-calendar3"></i>
            </div>

            <div className="login-decoration decoration-star">
              <i className="bi bi-stars"></i>
            </div>

            <div className="login-visual-footer">
              <i className="bi bi-heart-fill"></i>
              Making every moment count.
            </div>
          </div>

          <div className="login-form-panel">
            <div className="login-mobile-brand">
              <Link to="/" className="login-brand">
                <span className="login-brand-icon">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <span>
                  Eventora<span className="brand-dot">.</span>
                </span>
              </Link>
            </div>

            <div className="login-form-content">
              <div className="login-heading">
                <span className="login-user-badge">
                  <i className="bi bi-person-circle"></i>
                  USER LOGIN
                </span>
                <h2>Welcome Back!</h2>
                <p>
                  Sign in to your user account to discover and manage your
                  events.
                </p>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="login-input-group">
                  <label htmlFor="email">Email address</label>

                  <div className="login-input-wrapper">
                    <i className="bi bi-envelope login-input-icon"></i>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="login-input-group">
                  <div className="login-password-heading">
                    <label htmlFor="password">Password</label>

                    <Link to="/forgot-password">Forgot password?</Link>
                  </div>

                  <div className="login-input-wrapper">
                    <i className="bi bi-lock login-input-icon"></i>

                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <div className="login-options">
                  <label className="login-remember">
                    <input type="checkbox" name="remember" />
                    <span className="custom-checkbox"></span>
                    Remember me
                  </label>
                </div>

                <button type="submit" className="login-submit-btn">
                  <span>Sign In</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>
              <div className="login-divider">
                <span>YOUR NEXT EVENT AWAITS</span>
              </div>
              <p className="login-register-text">
                Don't have an account?
                <Link to="/user-register"> Create account</Link>
              </p>
              <Link to="/" className="login-back-home">
                <i className="bi bi-arrow-left"></i>
                Back to home
              </Link>
            </div>

            <div className="login-security-note">
              <i className="bi bi-shield-check"></i>
              Your information stays secure.
            </div>
          </div>
        </div>

        <p className="login-copyright">
          © {new Date().getFullYear()} Eventora. Made for memorable moments.
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
