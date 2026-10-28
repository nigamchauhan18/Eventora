import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/AdminForgotPassword.css";

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function AdminForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const userDash = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    try {
      const storedUser = localStorage.getItem("eventoraAdmin");
      if (!storedUser) {
        toast.error("No registered account found.");
        return;
      }
      const adminData = JSON.parse(storedUser);
      const emailMatch = adminData.email === data.email;
      if (!emailMatch) {
        toast.error("Email address is not registered.");
        return;
      }
      adminData.password = data.password;
      adminData.confirmPassword = data.password;
      localStorage.setItem("eventoraAdmin", JSON.stringify(adminData));
      toast.success("Password changed successfully!");
      reset();
      setTimeout(() => {
        userDash('/admin-login');
      }, 1500);
    } catch(error) {
      console.error("Password update failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }


  return (
    <div className="eventora-admin-forgot-page">
      {/* Background Decorations */}{" "}
      <div className="admin-forgot-shape admin-forgot-shape-one"></div>{" "}
      <div className="admin-forgot-shape admin-forgot-shape-two"></div>
      <div className="admin-forgot-wrapper">
        <div className="admin-forgot-card">
          {/* LEFT VISUAL PANEL */}
          <div className="admin-forgot-visual-panel">
            <div className="admin-forgot-visual-content">
              {/* Brand */}
              <Link to="/" className="admin-forgot-brand">
                <span className="admin-forgot-brand-icon">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <span>Eventora</span>
              </Link>

              {/* Heading */}
              <div className="admin-forgot-visual-heading">
                <span className="admin-forgot-eyebrow">
                  <span className="admin-forgot-eyebrow-dot"></span>
                  ACCOUNT RECOVERY
                </span>

                <h1>
                  Your access,
                  <br />
                  <span>restored securely.</span>
                </h1>

                <p>
                  Having trouble accessing your administrator account? We'll
                  help you get back to managing your events securely.
                </p>
              </div>

              {/* Security Features */}
              <div className="admin-forgot-feature-list">
                <div className="admin-forgot-feature">
                  <div className="admin-forgot-feature-icon">
                    <i className="bi bi-shield-lock"></i>
                  </div>

                  <div>
                    <h6>Secure Recovery</h6>
                    <p>Keep your administrator account protected.</p>
                  </div>
                </div>

                <div className="admin-forgot-feature">
                  <div className="admin-forgot-feature-icon">
                    <i className="bi bi-envelope-check"></i>
                  </div>

                  <div>
                    <h6>Email Verification</h6>
                    <p>Use your registered admin email address.</p>
                  </div>
                </div>

                <div className="admin-forgot-feature">
                  <div className="admin-forgot-feature-icon">
                    <i className="bi bi-arrow-repeat"></i>
                  </div>

                  <div>
                    <h6>Regain Access</h6>
                    <p>Follow the recovery instructions to continue.</p>
                  </div>
                </div>
              </div>

              {/* Decorative Icons */}
              <div className="admin-forgot-floating-icon admin-forgot-floating-one">
                <i className="bi bi-key"></i>
              </div>

              <div className="admin-forgot-floating-icon admin-forgot-floating-two">
                <i className="bi bi-stars"></i>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="admin-forgot-visual-footer">
              <span>MAKING EVERY MOMENT COUNT</span>
              <span>© {new Date().getFullYear()} Eventora</span>
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="admin-forgot-form-panel">
            {/* Mobile Brand */}
            <Link to="/" className="admin-forgot-mobile-brand">
              <span className="admin-forgot-mobile-brand-icon">
                <i className="bi bi-calendar-event"></i>
              </span>
              Eventora
            </Link>

            <div className="admin-forgot-form-content">
              {/* Main Icon */}
              <div className="admin-forgot-main-icon">
                <i className="bi bi-key"></i>
              </div>

              {/* Heading */}
              <div className="admin-forgot-form-heading">
                <span className="admin-forgot-form-badge">
                  <i className="bi bi-shield-check me-2"></i>
                  ADMIN ACCOUNT RECOVERY
                </span>

                <h2>Forgot Password?</h2>

                <p>
                  Don't worry. Enter the email address associated with your
                  administrator account to begin the recovery process.
                </p>
              </div>

              {/* Recovery Form */}
              <form className="admin-forgot-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="admin-forgot-field-group">
                  <label htmlFor="admin-forgot-email">
                    Administrator Email
                  </label>

                  <div className="admin-forgot-input-wrapper">
                    <i className="bi bi-envelope admin-forgot-input-icon"></i>

                    <input
                      type="email"
                      id="admin-forgot-email"
                      name="email"
                      placeholder="admin@example.com"
                      autoComplete="email"
                      {...register("email", { required: "Email is required.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address." }})}
                    />
                  </div>

                  <small className="admin-forgot-field-hint">
                    Enter the email address you used to create your admin
                    account.
                  </small>
                  {errors.email && <small className="text-danger" style={{ fontSize: '12px' }}>{errors.email.message}</small>}
                </div>
                <div className="admin-forgot-field-group">
                  <label htmlFor="admin-forgot-password">
                    New Password
                  </label>

                  <div className="admin-forgot-input-wrapper">
                    <i className="bi bi-lock admin-forgot-input-icon"></i>

                    <input
                     type={showPassword ? "text" : "password"}
                      id="admin-forgot-password"
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

                {/* Submit Button */}
                <button type="submit" className="admin-forgot-submit-btn">
                  <span>Send Recovery Instructions</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>

              {/* Security Notice */}
              <div className="admin-forgot-security-box">
                <div className="admin-forgot-security-icon">
                  <i className="bi bi-shield-lock"></i>
                </div>

                <div>
                  <h6>Your Account Security Matters</h6>
                  <p>
                    Never share your password or password recovery link with
                    anyone.
                  </p>
                </div>
              </div>

              {/* Back to Login */}
              <div className="admin-forgot-login-footer">
                <Link to="/admin-login" className="admin-forgot-back-link">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Admin Login
                </Link>
              </div>

              {/* Home Link */}
              <div className="admin-forgot-home-footer">
                <Link to="/" className="admin-forgot-home-link">
                  <i className="bi bi-house-door me-1"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminForgotPassword;
