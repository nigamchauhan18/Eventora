import { useState } from "react";
import "../../../assets/Settings.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Settings = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("general");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const menuItems = [
    { id: "general", icon: "bi-person", label: "General" },
    { id: "security", icon: "bi-shield-lock", label: "Security" },
  ];

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('eventoraUser')));

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user, ...formData
    }
    localStorage.setItem("eventoraUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success("Profile updated successfully!");
  }

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  }

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields.');
      return;
    }

    if (passwordData.currentPassword !== user.password) {
      toast.error('Current password is incorrect.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New Password must contain at least 6 characters.');
      return;
    }

    if (passwordData.newPassword === passwordData.currentPassword) {
      toast.error('New password must be different from current password.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    const updatedUser = {
      ...user,
      password: passwordData.newPassword,
      confirmPassword: passwordData.newPassword,
    }

    localStorage.setItem('eventoraUser', JSON.stringify(updatedUser));
    setUser(updatedUser);

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    setShowPasswordForm(false);
    toast.success('Password changed successfully!');
  }

  return (
    <div className="settings-page">
      {" "}
      <main className="settings-main">
        {/* Page Header */}{" "}
        <div className="settings-header">
          {" "}
          <div>
            {" "}
            <span className="settings-eyebrow">PERSONALIZATION</span>{" "}
            <h2>Account Settings</h2>{" "}
            <p>Manage your account information and security.</p>{" "}
          </div>
          <div className="settings-header-icon">
            <i className="bi bi-gear-wide-connected"></i>
          </div>
        </div>
        {/* Settings Layout */}
        <div className="settings-layout">
          {/* Sidebar */}
          <div className="settings-sidebar">
            <div className="settings-sidebar-title">
              <i className="bi bi-grid"></i>
              SETTINGS MENU
            </div>

            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`settings-menu-item ${
                  activeTab === item.id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  setShowPasswordForm(false);
                }}
              >
                <i className={`bi ${item.icon}`}></i>
                {item.label}
                <i className="bi bi-chevron-right menu-arrow"></i>
              </button>
            ))}

            <div className="settings-help-card">
              <div className="settings-help-icon">
                <i className="bi bi-headset"></i>
              </div>
              <h4>Need Help?</h4>
              <p>Have questions about your account settings?</p>
              <button
                type="button"
                onClick={() => navigate("/user-dashboard/feedback")}
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="settings-content">
            {/* GENERAL SETTINGS */}
            {activeTab === "general" && (
              <div className="settings-panel">
                <div className="settings-panel-heading">
                  <div>
                    <h3>General Information</h3>
                    <p>Update your personal account information.</p>
                  </div>
                  <i className="bi bi-person-vcard"></i>
                </div>

                <div className="settings-profile-preview">
                  <div className="settings-avatar">{formData.fullName.charAt(0).toUpperCase() || 'U'}
                  </div>

                  <div>
                    <h4>{formData.fullName || 'Eventora User'}</h4>
                    <span>Eventora User</span>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile}>
                  <div className="settings-form-grid">
                    <div className="settings-input-group">
                      <label>Full Name</label>
                      <div className="settings-input-wrapper">
                        <i className="bi bi-person"></i>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="settings-input-group">
                      <label>Email Address</label>
                      <div className="settings-input-wrapper">
                        <i className="bi bi-envelope"></i>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="settings-input-group">
                      <label>Phone Number</label>
                      <div className="settings-input-wrapper">
                        <i className="bi bi-telephone"></i>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="settings-form-actions">
                    <button type="submit" className="settings-save-btn">
                      <i className="bi bi-check2-circle"></i>
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SECURITY SETTINGS */}
            {activeTab === "security" && (
              <div className="settings-panel">
                <div className="settings-panel-heading">
                  <div>
                    <h3>Password & Security</h3>
                    <p>Manage your password and account protection.</p>
                  </div>
                  <i className="bi bi-shield-lock"></i>
                </div>

                <div className="security-info-card">
                  <div className="security-info-icon">
                    <i className="bi bi-shield-check"></i>
                  </div>

                  <div>
                    <h4>Your Account is Protected</h4>
                    <p>Keep your password private and secure.</p>
                  </div>

                  <span>Secure</span>
                </div>

                {/* Change Password Option */}
                <div className="security-option">
                  <div className="security-option-icon">
                    <i className="bi bi-key-fill"></i>
                  </div>

                  <div className="security-option-content">
                    <h4>Change Password</h4>
                    <p>Update your password to keep your account secure.</p>
                  </div>

                  <button
                    type="button"
                    className="security-change-btn"
                    onClick={() => {
                      setShowPasswordForm(!showPasswordForm);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      });
                    }}
                  >{showPasswordForm ? "Cancel" : "Change"}
                  </button>
                </div>

                {/* Change Password Form */}
                {showPasswordForm && (
                  <div className="change-password-form">
                    <div className="password-form-heading">
                      <div>
                        <h4>Change Your Password</h4>
                        <p>Enter your current and new password below.</p>
                      </div>
                      <i className="bi bi-lock-fill"></i>
                    </div>

                    <form onSubmit={handleChangePassword}>
                      {/* Current Password */}
                      <div className="settings-input-group">
                        <label>Current Password</label>

                        <div className="settings-input-wrapper">
                          <i className="bi bi-lock"></i>

                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter current password"
                          />

                          <i
                            className={`bi ${
                              showCurrentPassword ? "bi-eye-slash" : "bi-eye"
                            } password-eye`}
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}                       
                          ></i>
                        </div>
                      </div>

                      {/* New Password */}
                      <div className="settings-input-group">
                        <label>New Password</label>

                        <div className="settings-input-wrapper">
                          <i className="bi bi-lock-fill"></i>

                          <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter new password"                            
                          />

                          <i
                            className={`bi ${
                              showNewPassword ? "bi-eye-slash" : "bi-eye"
                            } password-eye`}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          ></i>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="settings-input-group">
                        <label>Confirm New Password</label>

                        <div className="settings-input-wrapper">
                          <i className="bi bi-shield-lock"></i>

                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirm new password"
                          />

                          <i
                            className={`bi ${
                              showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                            } password-eye`}
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          ></i>
                        </div>
                      </div>

                      <div className="password-hint">
                        <i className="bi bi-info-circle"></i>
                        Your new password must contain at least 6 characters.
                      </div>

                      <div className="password-form-actions">
                        <button
                          type="button"
                          className="password-cancel-btn"
                          onClick={() => {
                            setShowPasswordForm(false);
                            setPasswordData({
                              currentPassword: '',
                              newPassword: '',
                              confirmPassword: '',
                            });
                          }}
                        >
                          Cancel
                        </button>

                        <button type="submit" className="settings-save-btn">
                          <i className="bi bi-shield-check"></i>
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
