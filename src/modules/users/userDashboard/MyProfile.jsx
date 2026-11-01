import { useNavigate } from "react-router-dom";
import "../../../assets/MyProfile.css";

const MyProfile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("eventoraUser") || "null");

  const fullName = user.fullName || "Demo User";
  const email = user.email || "demouser@gmail.com";
  const phone = user.phone || "9768231846";
  
  const firstLetter = fullName.charAt(0).toUpperCase();

  return (
    <div className="my-profile-page">
      {" "}
      <div className="profile-main">
        {/* Header */}
        <div className="profile-top-header">
          <div>
            <span className="profile-eyebrow">PERSONAL SPACE</span>
            <h2>My Profile</h2>
            <p>Manage your personal information and account preferences.</p>
          </div>

          <button
            className="profile-settings-btn"
            onClick={() => navigate("/user-dashboard/settings")}
          >
            <i className="bi bi-gear-fill"></i>
            Account Settings
            <i className="bi bi-arrow-up-right"></i>
          </button>
        </div>

        {/* Profile Hero */}
        <div className="profile-hero">
          <div className="profile-hero-decoration"></div>

          <div className="profile-hero-content">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">{firstLetter}</div>
              <span className="profile-online-dot"></span>
            </div>

            <div className="profile-hero-info">
              <span className="profile-welcome">WELCOME TO EVENTORA</span>
              <h1>{fullName}</h1>
              <p>
                <i className="bi bi-envelope-fill"></i>
                {email}
              </p>
              <div className="profile-member-tag">
                <i className="bi bi-patch-check-fill"></i>
                Verified Member
              </div>
            </div>
          </div>

          <div className="profile-hero-right">
            <i className="bi bi-stars"></i>
            <span>YOUR EVENTS, YOUR WAY</span>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          <div className="profile-stat-card">
            <div className="profile-stat-icon purple-bg">
              <i className="bi bi-person-check-fill"></i>
            </div>
            <div>
              <span>Account Type</span>
              <h3>Standard User</h3>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon green-bg">
              <i className="bi bi-shield-check"></i>
            </div>
            <div>
              <span>Account Status</span>
              <h3 className="status-active">Active</h3>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon pink-bg">
              <i className="bi bi-envelope-check-fill"></i>
            </div>
            <div>
              <span>Email Status</span>
              <h3>Registered</h3>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content-grid">
          {/* Personal Details */}
          <div className="profile-details-card">
            <div className="profile-card-header">
              <div>
                <span>YOUR DETAILS</span>
                <h3>Personal Information</h3>
                <p>Your registered account information.</p>
              </div>

              <div className="profile-heading-icon">
                <i className="bi bi-person-vcard-fill"></i>
              </div>
            </div>

            <div className="profile-fields">
              <div className="profile-field">
                <div className="profile-field-icon">
                  <i className="bi bi-person-fill"></i>
                </div>
                <div className="profile-field-content">
                  <span>Full Name</span>
                  <h4>{fullName}</h4>
                </div>
                <i className="bi bi-check-circle-fill field-check"></i>
              </div>

              <div className="profile-field">
                <div className="profile-field-icon">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div className="profile-field-content">
                  <span>Email Address</span>
                  <h4>{email}</h4>
                </div>
                <i className="bi bi-check-circle-fill field-check"></i>
              </div>

              <div className="profile-field">
                <div className="profile-field-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div className="profile-field-content">
                  <span>Phone Number</span>
                  <h4>{phone}</h4>
                </div>
                <i className="bi bi-check-circle-fill field-check"></i>
              </div>

              <div className="profile-field">
                <div className="profile-field-icon">
                  <i className="bi bi-shield-lock-fill"></i>
                </div>
                <div className="profile-field-content">
                  <span>Account Security</span>
                  <h4>Password Protected</h4>
                </div>
                <i className="bi bi-check-circle-fill field-check"></i>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="profile-settings-card">
            <div className="profile-settings-top">
              <div className="settings-big-icon">
                <i className="bi bi-gear-wide-connected"></i>
              </div>
              <span>ACCOUNT PREFERENCES</span>
              <h3>Manage Your Account</h3>
              <p>
                Keep your account information updated and manage your personal
                preferences in one place.
              </p>
            </div>

            <div className="settings-feature">
              <i className="bi bi-person-lines-fill"></i>
              <span>Personal Details</span>
              <i className="bi bi-check-lg"></i>
            </div>

            <div className="settings-feature">
              <i className="bi bi-lock-fill"></i>
              <span>Password & Security</span>
              <i className="bi bi-check-lg"></i>
            </div>

            <div className="settings-feature">
              <i className="bi bi-bell-fill"></i>
              <span>Notifications</span>
              <i className="bi bi-check-lg"></i>
            </div>

            <button
              className="manage-account-btn"
              onClick={() => navigate("/user-dashboard/settings")}
            >
              Account Settings
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="profile-bottom-banner">
          <div className="bottom-banner-icon">
            <i className="bi bi-heart-fill"></i>
          </div>
          <div>
            <h4>Make every moment memorable!</h4>
            <p>
              Discover exciting events and create unforgettable memories with
              Eventora.
            </p>
          </div>
          <i className="bi bi-stars bottom-stars"></i>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
