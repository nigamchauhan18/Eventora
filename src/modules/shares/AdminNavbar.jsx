import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/AdminNavbar.css";

function AdminNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      // Connect this to your admin search functionality.
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      setShowProfile(false);
      setShowMobileMenu(false);
      setShowNotifications(false);
      window.location.href = "/admin-login";
    }
  };

  const closeMenus = () => {
    setShowNotifications(false);
    setShowProfile(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((previous) => !previous);
    closeMenus();
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
    closeMenus();
  };

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-container">
        {/* LOGO */}
        <Link
          to="/admin-dashboard"
          className="admin-navbar-logo"
          onClick={closeMobileMenu}
        >
          <span className="admin-navbar-logo-icon">
            <i className="bi bi-calendar-event"></i>
          </span>

          <span className="admin-navbar-logo-text">
            Event<span>ora</span>
          </span>

          <span className="admin-navbar-brand-badge">ADMIN</span>
        </Link>

        {/* DESKTOP SEARCH BAR */}
        <form
          className="admin-navbar-search admin-desktop-search"
          onSubmit={handleSearch}
        >
          <i className="bi bi-search admin-navbar-search-icon"></i>

          <input
            type="search"
            name="adminSearch"
            placeholder="Search events, users, bookings..."
            aria-label="Search admin dashboard"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <button type="submit" aria-label="Submit search">
            <i className="bi bi-arrow-right"></i>
          </button>
        </form>

        {/* DESKTOP ACTIONS */}
        <div className="admin-navbar-actions admin-desktop-actions">
          {/* NOTIFICATIONS */}
          <div className="admin-navbar-dropdown-wrapper">
            <button
              type="button"
              className={`admin-navbar-icon-button ${
                showNotifications ? "admin-navbar-active" : ""
              }`}
              onClick={() => {
                setShowNotifications((previous) => !previous);
                setShowProfile(false);
              }}
              aria-label="Admin notifications"
              aria-expanded={showNotifications}
            >
              <i className="bi bi-bell"></i>
              <span className="admin-navbar-notification-indicator"></span>
            </button>

            {showNotifications && (
              <div className="admin-navbar-dropdown admin-notifications-dropdown">
                <div className="admin-navbar-dropdown-heading">
                  <div>
                    <h6>Notifications</h6>
                    <p>Stay updated with Eventora</p>
                  </div>

                  <span className="admin-navbar-dropdown-heading-icon">
                    <i className="bi bi-bell"></i>
                  </span>
                </div>

                <div className="admin-navbar-notification-empty">
                  <div className="admin-navbar-empty-icon">
                    <i className="bi bi-bell-slash"></i>
                  </div>

                  <h6>No notifications yet</h6>

                  <p>
                    New registrations, bookings, and platform updates will
                    appear here.
                  </p>

                  <Link
                    to="/admin-dashboard/notifications"
                    className="admin-navbar-view-all"
                    onClick={closeMenus}
                  >
                    View all notifications
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ADMIN PROFILE */}
          <div className="admin-navbar-dropdown-wrapper">
            <button
              type="button"
              className={`admin-navbar-profile ${
                showProfile ? "admin-navbar-active" : ""
              }`}
              onClick={() => {
                setShowProfile((previous) => !previous);
                setShowNotifications(false);
              }}
              aria-label="Admin profile menu"
              aria-expanded={showProfile}
            >
              <span className="admin-navbar-profile-avatar">A</span>

              <span className="admin-navbar-profile-info">
                <span className="admin-navbar-profile-name">Admin Name</span>

                <span className="admin-navbar-profile-role">Administrator</span>
              </span>

              <i
                className={`bi bi-chevron-down admin-navbar-profile-chevron ${
                  showProfile ? "admin-navbar-rotated" : ""
                }`}
              ></i>
            </button>

            {showProfile && (
              <div className="admin-navbar-dropdown admin-profile-dropdown">
                <div className="admin-navbar-profile-dropdown-header">
                  <span className="admin-navbar-profile-avatar admin-avatar-large">
                    A
                  </span>

                  <div>
                    <h6>Admin Name</h6>
                    <p>admin@eventora.com</p>
                  </div>
                </div>

                <div className="admin-navbar-dropdown-divider"></div>

                <Link
                  to="/admin-dashboard/my-profile"
                  className="admin-navbar-dropdown-link"
                  onClick={closeMenus}
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/admin-dashboard/users"
                  className="admin-navbar-dropdown-link"
                  onClick={closeMenus}
                >
                  <i className="bi bi-people"></i>
                  <span>Manage Users</span>
                </Link>

                <Link
                  to="/admin-dashboard/settings"
                  className="admin-navbar-dropdown-link"
                  onClick={closeMenus}
                >
                  <i className="bi bi-gear"></i>
                  <span>Account Settings</span>
                </Link>

                <div className="admin-navbar-dropdown-divider"></div>

                <button
                  type="button"
                  className="admin-navbar-dropdown-link admin-navbar-logout-link"
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
          className={`admin-navbar-mobile-toggle ${
            showMobileMenu ? "admin-navbar-toggle-active" : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label={showMobileMenu ? "Close menu" : "Open menu"}
          aria-expanded={showMobileMenu}
          aria-controls="admin-navbar-mobile-menu"
        >
          <i className={`bi ${showMobileMenu ? "bi-x-lg" : "bi-list"}`}></i>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        id="admin-navbar-mobile-menu"
        className={`admin-navbar-mobile-menu ${
          showMobileMenu ? "admin-navbar-mobile-menu-show" : ""
        }`}
      >
        {/* MOBILE SEARCH */}
        <form
          className="admin-navbar-search admin-mobile-search"
          onSubmit={handleSearch}
        >
          <i className="bi bi-search admin-navbar-search-icon"></i>

          <input
            type="search"
            name="adminMobileSearch"
            placeholder="Search events, users, bookings..."
            aria-label="Search admin dashboard"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <button type="submit" aria-label="Submit search">
            <i className="bi bi-arrow-right"></i>
          </button>
        </form>

        {/* MOBILE NOTIFICATIONS */}
        <div className="admin-navbar-mobile-section">
          <button
            type="button"
            className="admin-navbar-mobile-menu-item"
            onClick={() => {
              setShowNotifications((previous) => !previous);
              setShowProfile(false);
            }}
            aria-expanded={showNotifications}
          >
            <span className="admin-navbar-mobile-item-left">
              <span className="admin-navbar-mobile-item-icon">
                <i className="bi bi-bell"></i>
              </span>

              <span>Notifications</span>
            </span>

            <i
              className={`bi bi-chevron-down admin-navbar-mobile-chevron ${
                showNotifications ? "admin-navbar-rotated" : ""
              }`}
            ></i>
          </button>

          {showNotifications && (
            <div className="admin-navbar-mobile-notification-content">
              <div className="admin-navbar-notification-empty">
                <div className="admin-navbar-empty-icon">
                  <i className="bi bi-bell-slash"></i>
                </div>

                <h6>No notifications yet</h6>

                <p>
                  New registrations, bookings, and platform updates will appear
                  here.
                </p>

                <Link
                  to="/admin-dashboard/notifications"
                  className="admin-navbar-view-all"
                  onClick={closeMobileMenu}
                >
                  View all notifications
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE ADMIN PROFILE */}
        <div className="admin-navbar-mobile-section">
          <button
            type="button"
            className="admin-navbar-mobile-menu-item"
            onClick={() => {
              setShowProfile((previous) => !previous);
              setShowNotifications(false);
            }}
            aria-expanded={showProfile}
          >
            <span className="admin-navbar-mobile-item-left">
              <span className="admin-navbar-profile-avatar">A</span>

              <span className="admin-navbar-mobile-profile-text">
                <strong>Admin Name</strong>
                <small>admin@eventora.com</small>
              </span>
            </span>

            <i
              className={`bi bi-chevron-down admin-navbar-mobile-chevron ${
                showProfile ? "admin-navbar-rotated" : ""
              }`}
            ></i>
          </button>

          {showProfile && (
            <div className="admin-navbar-mobile-profile-links">
              <Link
                to="/admin-dashboard/my-profile"
                className="admin-navbar-dropdown-link"
                onClick={closeMobileMenu}
              >
                <i className="bi bi-person"></i>
                <span>My Profile</span>
              </Link>

              <Link
                to="/admin-dashboard/users"
                className="admin-navbar-dropdown-link"
                onClick={closeMobileMenu}
              >
                <i className="bi bi-people"></i>
                <span>Manage Users</span>
              </Link>

              <Link
                to="/admin-dashboard/settings"
                className="admin-navbar-dropdown-link"
                onClick={closeMobileMenu}
              >
                <i className="bi bi-gear"></i>
                <span>Account Settings</span>
              </Link>

              <button
                type="button"
                className="admin-navbar-dropdown-link admin-navbar-logout-link"
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

export default AdminNavbar;
