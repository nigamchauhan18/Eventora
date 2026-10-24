import { Link } from "react-router-dom";
import "../../assets/UserRegister.css";

function UserRegister() {
  return (
    <div className="register-page container-fluid d-flex justify-content-center align-items-center py-5 px-3">
      {" "}
      <div className="register-wrapper row g-0 shadow-lg">
        {/* LEFT CARD */}
        <div className="col-lg-5">
          <div className="register-left h-100 d-flex flex-column justify-content-between">
            <div>
              <a href="/" className="register-brand">
                <i className="bi bi-calendar-event me-2"></i>
                Eventora
              </a>

              <div className="register-intro">
                <span className="register-badge">YOUR EVENTS, YOUR WAY</span>

                <h1>Every Great Event Starts With You.</h1>

                <p>
                  Join Eventora and discover a simpler way to plan, organize,
                  and manage memorable events.
                </p>
              </div>

              <div className="register-feature">
                <div className="feature-icon">
                  <i className="bi bi-calendar2-check"></i>
                </div>

                <div>
                  <h6>Plan with Ease</h6>
                  <p>Organize your events in one place.</p>
                </div>
              </div>

              <div className="register-feature">
                <div className="feature-icon">
                  <i className="bi bi-people"></i>
                </div>

                <div>
                  <h6>Connect & Collaborate</h6>
                  <p>Bring your event ideas to life.</p>
                </div>
              </div>

              <div className="register-feature">
                <div className="feature-icon">
                  <i className="bi bi-stars"></i>
                </div>

                <div>
                  <h6>Create Memories</h6>
                  <p>Make every occasion special.</p>
                </div>
              </div>
            </div>

            <div className="register-left-footer">
              <hr />
              <p>© 2026 Eventora. Make every moment count.</p>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="col-lg-7">
          <div className="register-right">
            <div className="register-heading">
              <h2>Create Your Account</h2>
              <p>Enter your details to get started with Eventora.</p>
            </div>

            <form>
              {/* FULL NAME */}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>

                <div className="input-group register-input">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>

                <div className="input-group register-input">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>

                <div className="input-group register-input">
                  <span className="input-group-text">
                    <i className="bi bi-telephone"></i>
                  </span>

                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>

                <div className="input-group register-input">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                </div>

                <small className="password-hint">
                  Use at least 8 characters.
                </small>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>

                <div className="input-group register-input">
                  <span className="input-group-text">
                    <i className="bi bi-shield-lock"></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                </div>
              </div>

              {/* TERMS */}
              <div className="form-check register-terms mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                  required
                />

                <label className="form-check-label" htmlFor="terms">
                  I agree to the <Link to="/terms">Terms and Conditions</Link>.
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" className="register-submit">
                Create Account
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </form>

            <div className="register-bottom-links">
              <p>
                Already have an account? <Link to="/user-login">Login</Link>
              </p>

              <Link to="/" className="back-home">
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

export default UserRegister;
