import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/UserRegister.css";

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function UserRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userDash = useNavigate();

  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    try {
      console.log("Registration Data:", data);
      localStorage.setItem("eventoraUser", JSON.stringify(data));
      toast.success("Account created successfully!");
      reset();
      setTimeout(() => {
        userDash('/user-dashboard');
        toast.success("Welcome to Eventora! Your account is ready.");
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

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

              <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("fullName", { required: "Name is required", minLength: { value: 4, message: "Name must contain at least 4 characters" }})}
                    />
                  </div>
                  {errors.fullName && <small className="text-danger" style={{ fontSize: "12px" }}>{errors.fullName.message}</small>}
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
                      {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" }})}
                    />
                  </div>
                  {errors.email && <small className="text-danger" style={{ fontSize: "12px" }}>{errors.email.message}</small>}
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
                      title="Enter a valid phone number."
                      {...register("phone", { required: "Phone number is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit phone number" }})}
                    />
                  </div>
                  {errors.phone && <small className="text-danger" style={{ fontSize: "12px" }}> {errors.phone.message} </small>}
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
                      minLength={6}
                      {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must contain at least 6 characters" }})}
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
                  {errors.password && <small className="text-danger" style={{ fontSize: "12px" }}>{errors.password.message}</small>}
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
                      minLength={6}
                      {...register("confirmPassword", { required: "Please confirm your password", validate: (value) => value === watch("password") || "Passwords do not match", })}
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
                  {errors.confirmPassword && <small className="text-danger" style={{ fontSize: "12px" }}>{errors.confirmPassword.message}</small>}
                </div>

                <div className="register-terms">
                  <label className="register-terms-label">
                    <input
                      type="checkbox"
                      name="terms"
                      {...register("terms", { required: "You must accept the Terms & Conditions", })}
                    />
                    <span className="register-custom-checkbox"></span>
                    <span>
                      I agree to the <Link to="/terms">Terms & Conditions</Link>{" "}
                      and <Link to="/privacy">Privacy Policy</Link>.
                    </span>
                  </label>
                  {errors.terms && <small className="text-danger" style={{ fontSize: "12px" }}> {errors.terms.message} </small>}
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
