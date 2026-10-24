import "../../assets/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg eventora-navbar">
      <div className="container-fluid px-lg-5">
        {/* Brand Logo */}
        <Link className="navbar-brand eventora-brand" to="/">
          <span className="brand-icon">
            <i className="bi bi-calendar-event"></i>
          </span>
          <span>
            Event<span className="brand-highlight">ora</span>
          </span>
        </Link>

        {/* Mobile Toggle - UI Only */}
        <button
          className="navbar-toggler eventora-toggler"
          type="button"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list"></i>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="eventoraNavigation">
          <ul className="navbar-nav mx-auto eventora-nav-links">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <i className="bi bi-house-door me-2"></i>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/events">
                <i className="bi bi-calendar3 me-2"></i>
                Explore Events
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/my-events">
                <i className="bi bi-ticket-perforated me-2"></i>
                My Events
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <i className="bi bi-headset me-2"></i>
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <div className="navbar-actions">
            {/* Notification UI */}
            <div className="notification-wrapper">
              <button
                className="notification-btn"
                type="button"
                aria-label="Notifications"
              >
                <i className="bi bi-bell"></i>
                <span className="notification-badge">3</span>
              </button>
            </div>

            {/* Profile UI */}
            <div className="profile-wrapper">
              <button
                className="profile-button"
                type="button"
                aria-label="User profile"
              >
                <span className="profile-avatar">JD</span>

                <span className="profile-info">
                  <span className="profile-name">John Doe</span>
                  <span className="profile-role">Event Attendee</span>
                </span>

                <i className="bi bi-chevron-down profile-chevron"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
