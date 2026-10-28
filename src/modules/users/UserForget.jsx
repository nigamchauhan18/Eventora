import { Link } from "react-router-dom";
import { useState } from "react";
import "../../assets/ForgotPassword.css";

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function ForgotPassword() {
   const [showPassword, setShowPassword] = useState(false);

   const userDash = useNavigate();

   const { register, handleSubmit, reset, formState: { errors } } = useForm();
   
   const onSubmit = (data) => {
    try {
      const storedUser = localStorage.getItem("eventoraUser");

      if (!storedUser) {
        toast.error("No registered account found.");
        return;
      }
      const user = JSON.parse(storedUser);
      const emailMatch = user.email === data.email;
      if (!emailMatch) {
        toast.error("Email address is not registered.");
        return;
      }
      user.password = data.password;
      user.confirmPassword = data.password;
      localStorage.setItem("eventoraUser", JSON.stringify(user));
      toast.success("Password changed successfully!");
      reset();
      setTimeout(() => {
        userDash('/user-login');
      }, 1500);
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="eventora-forgot-page">
      <div className="forgot-background-shape forgot-shape-one"></div>
      <div className="forgot-background-shape forgot-shape-two"></div>

      <div className="forgot-wrapper">
        <div className="forgot-card">
          {/* LEFT VISUAL PANEL */}
          <div className="forgot-visual-panel">
            <div className="forgot-visual-content">
              <Link to="/" className="forgot-brand">
                <span className="forgot-brand-icon">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <span>Eventora</span>
              </Link>

              <div className="forgot-visual-heading">
                <span className="forgot-eyebrow">
                  <span className="forgot-eyebrow-dot"></span>
                  ACCOUNT RECOVERY
                </span>

                <h1>
                  A little setback,
                  <br />
                  <span>a fresh start.</span>
                </h1>

                <p>
                  Forgot your password? No worries. Let's help you get back to
                  planning unforgettable moments with Eventora.
                </p>
              </div>

              <div className="forgot-feature-list">
                <div className="forgot-feature">
                  <div className="forgot-feature-icon">
                    <i className="bi bi-shield-lock"></i>
                  </div>

                  <div>
                    <h6>Secure Recovery</h6>
                    <p>Your account security comes first.</p>
                  </div>
                </div>

                <div className="forgot-feature">
                  <div className="forgot-feature-icon">
                    <i className="bi bi-envelope-paper"></i>
                  </div>

                  <div>
                    <h6>Simple & Easy</h6>
                    <p>Get reset instructions through email.</p>
                  </div>
                </div>

                <div className="forgot-feature">
                  <div className="forgot-feature-icon">
                    <i className="bi bi-calendar2-heart"></i>
                  </div>

                  <div>
                    <h6>Your Events Await</h6>
                    <p>Get back to creating special memories.</p>
                  </div>
                </div>
              </div>

              <div className="forgot-floating-icon forgot-floating-one">
                <i className="bi bi-key"></i>
              </div>

              <div className="forgot-floating-icon forgot-floating-two">
                <i className="bi bi-stars"></i>
              </div>
            </div>

            <div className="forgot-visual-footer">
              <span>MAKING EVERY MOMENT COUNT</span>
              <span>© {new Date().getFullYear()} Eventora</span>
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="forgot-form-panel">
            {/* Mobile brand */}
            <Link to="/" className="forgot-mobile-brand">
              <span className="forgot-mobile-brand-icon">
                <i className="bi bi-calendar-event"></i>
              </span>
              Eventora
            </Link>

            <div className="forgot-form-content">
              <div className="forgot-main-icon">
                <i className="bi bi-lock-fill"></i>
              </div>

              <div className="forgot-heading">
                <span className="forgot-form-badge">
                  <i className="bi bi-shield-check me-2"></i>
                  PASSWORD ASSISTANCE
                </span>

                <h2>Forgot Password?</h2>

                <p>
                  It happens! Enter your registered email address and we'll help
                  you get back into your account.
                </p>
              </div>

              <form className="forgot-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="forgot-field-group">
                  <label htmlFor="forgot-email">Email Address</label>

                  <div className="forgot-input-wrapper">
                    <i className="bi bi-envelope forgot-input-icon"></i>

                    <input
                      type="email"
                      id="forgot-email"
                      name="email"
                      placeholder="Enter your registered email"
                      autoComplete="email"
                      {...register("email", { required: "Email is required.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address." }})}
                    />
                  </div>

                  <small className="forgot-input-hint">
                    <i className="bi bi-info-circle me-1"></i>
                    Use the email address linked to your account.
                  </small>
                  {errors.email && <small className="text-danger" style={{ fontSize: '12px' }}>{errors.email.message}</small>}
                </div>

                <div className="forgot-field-group">
                  <label htmlFor="forgot-password">New Password</label>

                  <div className="forgot-input-wrapper">
                    <i className="bi bi-lock forgot-input-icon"></i>

                    <input
                      type={showPassword ? "text" : "password"}
                      id="forgot-password"
                      name="password"
                      placeholder="Enter your new password"
                      autoComplete="password"
                      {...register("password", { required: "Password is required.", minLength: { value: 6, message: "Password must contain at least 6 characters." }})}
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
                  {errors.password && <small className="text-danger" style={{ fontSize: '12px' }}>{errors.password.message}</small> }
                </div>

                <button type="submit" className="forgot-submit-btn">
                  <span>Send Reset Instructions</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>

              <div className="forgot-divider">
                <span>OR</span>
              </div>

              <div className="forgot-login-section">
                <p>Remembered your password?</p>

                <Link to="/user-login" className="forgot-login-link">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Login
                </Link>
              </div>

              <div className="forgot-support-box">
                <div className="forgot-support-icon">
                  <i className="bi bi-headset"></i>
                </div>

                <div>
                  <h6>Need a little help?</h6>
                  <p>
                    Contact our support team if you're having trouble accessing
                    your account.
                  </p>
                </div>
              </div>

              <div className="forgot-form-footer">
                <Link to="/" className="forgot-home-link">
                  <i className="bi bi-house-door me-1"></i>
                  Back to Home
                </Link>

                <span className="forgot-security-note">
                  <i className="bi bi-shield-check me-1"></i>
                  Your information stays secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
