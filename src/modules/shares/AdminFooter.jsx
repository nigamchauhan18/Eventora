import { Link } from "react-router-dom";
import "../../assets/AdminFooter.css";

function AdminFooter() {
  return (
    <footer className="admin-footer">
      <div className="container-fluid px-4 px-lg-5">
        <div className="row g-4">

          {/* BRAND SECTION */}
          <div className="col-lg-4 col-md-6">
            <Link
              to="/admin-dashboard"
              className="admin-footer-brand"
            >
              <span className="admin-footer-logo">
                <i className="bi bi-calendar-event"></i>
              </span>

              <span>Eventora</span>
              <span className="admin-footer-badge">ADMIN</span>
            </Link>

            <p className="admin-footer-description">
              Manage events, organize registrations, monitor bookings,
              and oversee your Eventora platform from one place.
              Everything you need to manage events efficiently.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="admin-footer-socials">
              <a
                href="https://www.facebook.com/"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="https://www.instagram.com/"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="https://www.linkedin.com/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </a>

              <a
                href="https://www.youtube.com/"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="admin-footer-heading">
              Quick Links
            </h5>

            <ul className="admin-footer-links">
              <li>
                <Link to="/admin-dashboard">Dashboard</Link>
              </li>

              <li>
                <Link to="/admin-dashboard/events">
                  Manage Events
                </Link>
              </li>

              <li>
                <Link to="/admin-dashboard/categories">
                  Categories
                </Link>
              </li>

              <li>
                <Link to="/admin-dashboard/users">
                  Manage Users
                </Link>
              </li>

              <li>
                <Link to="/admin-dashboard/reports">
                  Reports & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* MANAGEMENT LINKS */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="admin-footer-heading">
              Management
            </h5>

            <ul className="admin-footer-links">
              <li>
                <Link to="/admin-dashboard/registrations">
                  Registrations
                </Link>
              </li>

              <li>
                <Link to="/admin-dashboard/bookings">
                  Bookings
                </Link>
              </li>

              <li>
                <Link to="/admin-dashboard/payments">
                  Payments
                </Link>
              </li>

              <li>
                <Link to="/admin-dashboard/notifications">
                  Notifications
                </Link>
              </li>

              <li>
                <Link to="/admin-login">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT SECTION */}
          <div className="col-lg-4 col-md-6">
            <h5 className="admin-footer-heading">
              Administration Support
            </h5>

            <p className="admin-footer-contact">
              <i className="bi bi-envelope"></i>
              <span>support@eventora.com</span>
            </p>

            <p className="admin-footer-contact">
              <i className="bi bi-telephone"></i>
              <span>+91 98765 43210</span>
            </p>

            <p className="admin-footer-contact">
              <i className="bi bi-geo-alt"></i>
              <span>India</span>
            </p>

            <Link
              to="/admin-dashboard/notifications"
              className="admin-footer-contact-btn"
            >
              View Notifications
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="admin-footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Eventora.
            All rights reserved.
          </p>

          <div className="admin-footer-legal">
            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;
