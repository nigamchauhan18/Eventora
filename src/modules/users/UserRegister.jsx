import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/UserRegister.css";

function UserRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const password = form.password.value;
  //   const confirmPassword = form.confirmPassword.value;
  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match.");
  //     return;
  //   }
  //   alert("Registration form submitted successfully!");
  // };

  return (
    <div className="eventora-register-page">
      {" "}
      <div className="register-background-shape register-shape-one"></div>{" "}
      <div className="register-wrapper">
        <div className="register-card">
          <div className="register-visual-panel">
            <Link to="/" className="register-brand">
              <span className="register-brand-icon">
                <i className="bi bi-calendar-event"></i>
              </span>
              <span>
                Eventora<span className="register-brand-dot">.</span>
              </span>
            </Link>

            <div className="register-visual-content">
              <span className="register-eyebrow">
                <span className="register-eyebrow-dot"></span>
                YOUR EVENTS, YOUR WAY
              </span>

              <h1>
                Every great
                <br />
                moment starts
                <br />
                <span>with you.</span>
              </h1>

              <p>
                Create your account and discover a simpler way to plan,
                organize, and manage unforgettable events.
              </p>

              <div className="register-visual-features">
                <div className="register-visual-feature">
                  <div className="register-feature-icon">
                    <i className="bi bi-calendar2-check"></i>
                  </div>
                  <div>
                    <h6>Plan with Ease</h6>
                    <span>Keep your events organized in one place.</span>
                  </div>
                </div>

                <div className="register-visual-feature">
                  <div className="register-feature-icon">
                    <i className="bi bi-people"></i>
                  </div>
                  <div>
                    <h6>Connect & Collaborate</h6>
                    <span>Bring your event ideas to life.</span>
                  </div>
                </div>

                <div className="register-visual-feature">
                  <div className="register-feature-icon">
                    <i className="bi bi-stars"></i>
                  </div>
                  <div>
                    <h6>Create Memories</h6>
                    <span>Make every occasion special.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="register-decoration register-decoration-calendar">
              <i className="bi bi-calendar3"></i>
            </div>

            <div className="register-decoration register-decoration-star">
              <i className="bi bi-stars"></i>
            </div>

            <div className="register-visual-footer">
              <i className="bi bi-heart-fill"></i>
              Making every moment count.
            </div>
          </div>

          <div className="register-form-panel">
            <div className="register-mobile-brand">
              <Link to="/" className="register-brand">
                <span className="register-brand-icon">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <span>
                  Eventora<span className="register-brand-dot">.</span>
                </span>
              </Link>
            </div>

            <div className="register-form-content">
              <div className="register-heading">
                <span className="register-user-badge">
                  <i className="bi bi-person-plus"></i>
                  USER REGISTRATION
                </span>

                <h2>Create Your Account</h2>

                <p>Join Eventora and start creating memorable experiences.</p>
              </div>

              <form>
                <div className="register-input-group">
                  <label htmlFor="fullName">Full name</label>

                  <div className="register-input-wrapper">
                    <i className="bi bi-person register-input-icon"></i>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                <div className="register-input-group">
                  <label htmlFor="registerEmail">Email address</label>

                  <div className="register-input-wrapper">
                    <i className="bi bi-envelope register-input-icon"></i>
                    <input
                      type="email"
                      id="registerEmail"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="register-input-group">
                  <label htmlFor="phone">Phone number</label>

                  <div className="register-input-wrapper">
                    <i className="bi bi-telephone register-input-icon"></i>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      pattern="[0-9+() -]{7,20}"
                      title="Enter a valid phone number."
                      required
                    />
                  </div>
                </div>

                <div className="register-input-group">
                  <label htmlFor="registerPassword">Password</label>

                  <div className="register-input-wrapper">
                    <i className="bi bi-lock register-input-icon"></i>

                    <input
                      type={showPassword ? "text" : "password"}
                      id="registerPassword"
                      name="password"
                      placeholder="Create a password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="register-password-toggle"
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

                  <small className="register-field-hint">
                    Use at least 8 characters.
                  </small>
                </div>

                <div className="register-input-group">
                  <label htmlFor="confirmPassword">Confirm password</label>

                  <div className="register-input-wrapper">
                    <i className="bi bi-shield-lock register-input-icon"></i>

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="register-password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      <i
                        className={`bi ${
                          showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <div className="register-terms">
                  <label className="register-terms-label">
                    <input type="checkbox" name="terms" required />
                    <span className="register-custom-checkbox"></span>
                    <span>
                      I agree to the <Link to="/terms">Terms & Conditions</Link>{" "}
                      and <Link to="/privacy">Privacy Policy</Link>.
                    </span>
                  </label>
                </div>

                <button type="submit" className="register-submit-btn">
                  <span>Create Account</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>

              <div className="register-divider">
                <span>YOUR NEXT EVENT AWAITS</span>
              </div>

              <p className="register-login-text">
                Already have an account?
                <Link to="/user-login"> Sign in</Link>
              </p>

              <Link to="/" className="register-back-home">
                <i className="bi bi-arrow-left"></i>
                Back to home
              </Link>
            </div>

            <div className="register-security-note">
              <i className="bi bi-shield-check"></i>
              Your information stays secure.
            </div>
          </div>
        </div>

        <p className="register-copyright">
          © {new Date().getFullYear()} Eventora. Made for memorable moments.
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
