import "../../assets/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="eventora-footer">
      {/* Main Footer */}
      <div className="container">
        <div className="row g-4 footer-main">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="footer-brand">
              <span className="footer-brand-icon">
                <i className="bi bi-calendar-event"></i>
              </span>
              <span>
                Event<span className="footer-brand-highlight">ora</span>
              </span>
            </Link>

            <p className="footer-description">
              Discover amazing events, connect with incredible people, and
              create unforgettable memories with Eventora.
            </p>

            {/* Social Media */}
            <div className="footer-socials">
              <Link to="#" aria-label="Facebook" className="social-icon">
                <i className="bi bi-facebook"></i>
              </Link>

              <Link to="#" aria-label="Instagram" className="social-icon">
                <i className="bi bi-instagram"></i>
              </Link>

              <Link to="#" aria-label="Twitter" className="social-icon">
                <i className="bi bi-twitter-x"></i>
              </Link>

              <Link to="#" aria-label="LinkedIn" className="social-icon">
                <i className="bi bi-linkedin"></i>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="footer-heading">Quick Links</h5>

            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/events">Explore Events</Link>
              </li>
              <li>
                <Link to="/my-events">My Events</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div className="col-lg-3 col-md-6 col-6">
            <h5 className="footer-heading">Event Categories</h5>

            <ul className="footer-links">
              <li>
                <Link to="/events">Music & Concerts</Link>
              </li>
              <li>
                <Link to="/events">Technology</Link>
              </li>
              <li>
                <Link to="/events">Business & Networking</Link>
              </li>
              <li>
                <Link to="/events">Arts & Culture</Link>
              </li>
              <li>
                <Link to="/events">Sports & Fitness</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Get In Touch</h5>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <i className="bi bi-envelope"></i>
              </span>

              <div>
                <p className="footer-contact-label">Email Us</p>
                <Link to="mailto:support@eventora.com">support@eventora.com</Link>
              </div>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <i className="bi bi-telephone"></i>
              </span>

              <div>
                <p className="footer-contact-label">Call Us</p>
                <Link to="tel:+911234567890">+91 12345 67890</Link>
              </div>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <i className="bi bi-geo-alt"></i>
              </span>

              <div>
                <p className="footer-contact-label">Our Location</p>
                <span className="footer-contact-text">New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter UI */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <div className="newsletter-icon">
              <i className="bi bi-envelope-paper"></i>
            </div>

            <div>
              <h5>Stay Updated with Eventora</h5>
              <p>Discover exciting events and get the latest updates.</p>
            </div>
          </div>

          <div className="newsletter-form">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email address"
              aria-label="Email address"
            />

            <button type="button" className="newsletter-button">
              Subscribe <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>
            © 2026 <span>Eventora</span>. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="footer-divider">|</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span className="footer-divider">|</span>
            <Link to="/help">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
