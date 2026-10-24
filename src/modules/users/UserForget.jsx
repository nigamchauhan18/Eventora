import "../../assets/ForgotPassword.css";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="forgot-page container-fluid d-flex justify-content-center align-items-center py-5 px-3">
      {" "}
      <div className="forgot-wrapper row g-0 shadow-lg">
        {/* LEFT CARD */}
        <div className="col-lg-5">
          <div className="forgot-left h-100 d-flex flex-column justify-content-between">
            <div>
              <a href="/" className="forgot-brand">
                <i className="bi bi-calendar-event me-2"></i>
                Eventora
              </a>

              <div className="forgot-intro">
                <span className="forgot-badge">ACCOUNT RECOVERY</span>

                <h1>Forgot Your Password?</h1>

                <p>
                  Don't worry! It happens to everyone. Follow a few simple steps
                  to regain access to your Eventora account.
                </p>
              </div>

              <div className="forgot-feature">
                <div className="forgot-feature-icon">
                  <i className="bi bi-shield-check"></i>
                </div>

                <div>
                  <h6>Secure Recovery</h6>
                  <p>Help protect your account during recovery.</p>
                </div>
              </div>

              <div className="forgot-feature">
                <div className="forgot-feature-icon">
                  <i className="bi bi-envelope-check"></i>
                </div>

                <div>
                  <h6>Simple Process</h6>
                  <p>Receive password reset instructions by email.</p>
                </div>
              </div>

              <div className="forgot-feature">
                <div className="forgot-feature-icon">
                  <i className="bi bi-calendar2-check"></i>
                </div>

                <div>
                  <h6>Back to Planning</h6>
                  <p>Get back to organizing your favorite events.</p>
                </div>
              </div>
            </div>

            <div className="forgot-left-footer">
              <hr />
              <p>© 2026 Eventora. Make every moment count.</p>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="col-lg-7">
          <div className="forgot-right">
            <div className="forgot-icon-main">
              <i className="bi bi-lock"></i>
            </div>

            <div className="forgot-heading">
              <h2>Reset Your Password</h2>
              <p>
                Enter the email address associated with your account. We'll help
                you get back in.
              </p>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                alert("Password recovery functionality needs to be connected.");
              }}
            >
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>

                <div className="input-group forgot-input">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your registered email"
                    autoComplete="email"
                    required
                  />
                </div>

                <small className="forgot-hint">
                  Enter the email you used when creating your account.
                </small>
              </div>

              <button type="submit" className="forgot-submit">
                Send Reset Instructions
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </form>

            <div className="forgot-divider">
              <span>Remember your password?</span>
            </div>

            <Link to="/user-login" className="forgot-login-link">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Login
            </Link>

            <div className="forgot-help">
              <i className="bi bi-info-circle me-2"></i>
              Need help? Contact our support team.
            </div>

            <div className="forgot-bottom">
              <Link href="/">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
