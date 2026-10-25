import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/Navbar.css";

function UserDashboardNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      // Connect this to your event search functionality.
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleLogout = () => {
    // Connect this to your authentication system.
    alert("Logout functionality needs to be connected.");
    setShowProfile(false);
    setShowMobileMenu(false);
  };

  const closeMenus = () => {
    setShowNotifications(false);
    setShowProfile(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((previous) => !previous);
    closeMenus();
  };

  return (
    <header className="eventora-dashboard-navbar">
      <div className="dashboard-navbar-container">
        {/* LOGO */}
        <Link
          to="/user-dashboard"
          className="dashboard-navbar-logo"
          onClick={() => {
            setShowMobileMenu(false);
            closeMenus();
          }}
        >
          <span className="dashboard-logo-icon">
            <i className="bi bi-calendar-event"></i>
          </span>

          <span className="dashboard-logo-text">
            Event<span>ora</span>
          </span>
        </Link>

        {/* DESKTOP SEARCH BAR */}
        <form
          className="dashboard-navbar-search desktop-search"
          onSubmit={handleSearch}
        >
          <i className="bi bi-search dashboard-search-icon"></i>

          <input
            type="search"
            name="search"
            placeholder="Search events, categories..."
            aria-label="Search events"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <button type="submit" aria-label="Submit search">
            <i className="bi bi-arrow-right"></i>
          </button>
        </form>

        {/* DESKTOP ACTIONS */}
        <div className="dashboard-navbar-actions desktop-actions">
          {/* NOTIFICATIONS */}
          <div className="dashboard-navbar-dropdown-wrapper">
            <button
              type="button"
              className={`dashboard-navbar-icon-button ${
                showNotifications ? "active" : ""
              }`}
              onClick={() => {
                setShowNotifications((previous) => !previous);
                setShowProfile(false);
              }}
              aria-label="Notifications"
              aria-expanded={showNotifications}
            >
              <i className="bi bi-bell"></i>
              <span className="dashboard-notification-indicator"></span>
            </button>

            {showNotifications && (
              <div className="dashboard-navbar-dropdown dashboard-notifications-dropdown">
                <div className="dashboard-dropdown-heading">
                  <div>
                    <h6>Notifications</h6>
                    <p>Stay updated with Eventora</p>
                  </div>

                  <span className="dashboard-dropdown-heading-icon">
                    <i className="bi bi-bell"></i>
                  </span>
                </div>

                <div className="dashboard-notification-empty">
                  <div className="dashboard-notification-empty-icon">
                    <i className="bi bi-bell-slash"></i>
                  </div>

                  <h6>No notifications yet</h6>

                  <p>
                    Your event updates and booking notifications will appear
                    here.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* USER PROFILE */}
          <div className="dashboard-navbar-dropdown-wrapper">
            <button
              type="button"
              className={`dashboard-navbar-profile ${
                showProfile ? "active" : ""
              }`}
              onClick={() => {
                setShowProfile((previous) => !previous);
                setShowNotifications(false);
              }}
              aria-label="User profile menu"
              aria-expanded={showProfile}
            >
              <span className="dashboard-profile-avatar">U</span>

              <span className="dashboard-profile-info">
                <span className="dashboard-profile-name">User Name</span>
                <span className="dashboard-profile-role">Member Account</span>
              </span>

              <i
                className={`bi bi-chevron-down dashboard-profile-chevron ${
                  showProfile ? "rotated" : ""
                }`}
              ></i>
            </button>

            {showProfile && (
              <div className="dashboard-navbar-dropdown dashboard-profile-dropdown">
                <div className="dashboard-profile-dropdown-header">
                  <span className="dashboard-profile-avatar large">U</span>

                  <div>
                    <h6>User Name</h6>
                    <p>user@example.com</p>
                  </div>
                </div>

                <div className="dashboard-dropdown-divider"></div>

                <Link
                  to="/user-dashboard/my-profile"
                  className="dashboard-dropdown-link"
                  onClick={closeMenus}
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/user-dashboard/my-bookings"
                  className="dashboard-dropdown-link"
                  onClick={closeMenus}
                >
                  <i className="bi bi-ticket-perforated"></i>
                  <span>My Bookings</span>
                </Link>

                <Link
                  to="/user-dashboard/settings"
                  className="dashboard-dropdown-link"
                  onClick={closeMenus}
                >
                  <i className="bi bi-gear"></i>
                  <span>Account Settings</span>
                </Link>

                <div className="dashboard-dropdown-divider"></div>

                <button
                  type="button"
                  className="dashboard-dropdown-link dashboard-logout-link"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          type="button"
          className={`dashboard-mobile-menu-toggle ${
            showMobileMenu ? "active" : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label={showMobileMenu ? "Close menu" : "Open menu"}
          aria-expanded={showMobileMenu}
          aria-controls="dashboard-mobile-menu"
        >
          <i className={`bi ${showMobileMenu ? "bi-x-lg" : "bi-list"}`}></i>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        id="dashboard-mobile-menu"
        className={`dashboard-mobile-menu ${showMobileMenu ? "show" : ""}`}
      >
        {/* MOBILE SEARCH */}
        <form
          className="dashboard-navbar-search mobile-search"
          onSubmit={handleSearch}
        >
          <i className="bi bi-search dashboard-search-icon"></i>

          <input
            type="search"
            name="mobileSearch"
            placeholder="Search events, categories..."
            aria-label="Search events"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <button type="submit" aria-label="Submit search">
            <i className="bi bi-arrow-right"></i>
          </button>
        </form>

        {/* MOBILE NOTIFICATIONS */}
        <div className="dashboard-mobile-section">
          <button
            type="button"
            className="dashboard-mobile-menu-item"
            onClick={() => {
              setShowNotifications((previous) => !previous);
              setShowProfile(false);
            }}
            aria-expanded={showNotifications}
          >
            <span className="dashboard-mobile-item-left">
              <span className="dashboard-mobile-item-icon">
                <i className="bi bi-bell"></i>
              </span>
              <span>Notifications</span>
            </span>

            <i
              className={`bi bi-chevron-down mobile-item-chevron ${
                showNotifications ? "rotated" : ""
              }`}
            ></i>
          </button>

          {showNotifications && (
            <div className="dashboard-mobile-notification-content">
              <div className="dashboard-notification-empty">
                <div className="dashboard-notification-empty-icon">
                  <i className="bi bi-bell-slash"></i>
                </div>

                <h6>No notifications yet</h6>

                <p>
                  Your event updates and booking notifications will appear here.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE PROFILE */}
        <div className="dashboard-mobile-section">
          <button
            type="button"
            className="dashboard-mobile-menu-item"
            onClick={() => {
              setShowProfile((previous) => !previous);
              setShowNotifications(false);
            }}
            aria-expanded={showProfile}
          >
            <span className="dashboard-mobile-item-left">
              <span className="dashboard-profile-avatar">U</span>

              <span className="dashboard-mobile-profile-text">
                <strong>User Name</strong>
                <small>user@example.com</small>
              </span>
            </span>

            <i
              className={`bi bi-chevron-down mobile-item-chevron ${
                showProfile ? "rotated" : ""
              }`}
            ></i>
          </button>

          {showProfile && (
            <div className="dashboard-mobile-profile-links">
              <Link
                to="/user-dashboard/my-profile"
                className="dashboard-dropdown-link"
                onClick={() => {
                  closeMenus();
                  setShowMobileMenu(false);
                }}
              >
                <i className="bi bi-person"></i>
                <span>My Profile</span>
              </Link>

              <Link
                to="/user-dashboard/my-bookings"
                className="dashboard-dropdown-link"
                onClick={() => {
                  closeMenus();
                  setShowMobileMenu(false);
                }}
              >
                <i className="bi bi-ticket-perforated"></i>
                <span>My Bookings</span>
              </Link>

              <Link
                to="/user-dashboard/settings"
                className="dashboard-dropdown-link"
                onClick={() => {
                  closeMenus();
                  setShowMobileMenu(false);
                }}
              >
                <i className="bi bi-gear"></i>
                <span>Account Settings</span>
              </Link>

              <button
                type="button"
                className="dashboard-dropdown-link dashboard-logout-link"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default UserDashboardNavbar;
