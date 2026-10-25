import { Link } from "react-router-dom";
import "../../assets/Footer.css";

function Footer() {
  return (
    <footer className="eventora-footer">
      <div className="container-fluid px-4 px-lg-5">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <Link to="/user-dashboard" className="eventora-footer-brand">
              <span className="eventora-footer-logo">
                <i className="bi bi-calendar-event"></i>
              </span>
              <span>Eventora</span>
            </Link>

            <p className="eventora-footer-description">
              Discover amazing events, connect with people, and create
              unforgettable memories with Eventora. Your next great experience
              starts here.
            </p>

            {/* Social Media */}
            <div className="eventora-footer-socials">
              <a href="https://www.facebook.com/" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="https://www.instagram.com/" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="https://www.linkedin.com/" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>

              <a href="https://www.youtube.com/" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="eventora-footer-heading">Quick Links</h5>

            <ul className="eventora-footer-links">
              <li>
                <Link to="/user-dashboard">Home</Link>
              </li>
              <li>
                <Link to="/user-dashboard/explore-events">Explore Events</Link>
              </li>
              <li>
                <Link to="/user-dashboard/calendar">Calendar</Link>
              </li>
              <li>
                <Link to="/user-dashboard/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/user-dashboard/about">About Us</Link>
              </li>
            </ul>
          </div>

          {/* User Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="eventora-footer-heading">My Account</h5>

            <ul className="eventora-footer-links">
              <li>
                <Link to="/user-dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/user-dashboard/my-bookings">My Bookings</Link>
              </li>
              <li>
                <Link to="/user-dashboard/my-tickets">My Tickets</Link>
              </li>
              <li>
                <Link to="/user-dashboard/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link to="/user-dashboard/registrations">Registrations</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-lg-4 col-md-6">
            <h5 className="eventora-footer-heading">Get in Touch</h5>

            <p className="eventora-footer-contact">
              <i className="bi bi-envelope"></i>
              <span>support@eventora.com</span>
            </p>

            <p className="eventora-footer-contact">
              <i className="bi bi-telephone"></i>
              <span>+91 98765 43210</span>
            </p>

            <p className="eventora-footer-contact">
              <i className="bi bi-geo-alt"></i>
              <span>India</span>
            </p>

            <Link to="/user-dashboard/feedback" className="eventora-footer-contact-btn">
              Send Feedback
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="eventora-footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Eventora. All rights reserved.
          </p>

          <div className="eventora-footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
