import { Link } from "react-router-dom";
import "./assets/Welcome.css";

const Welcome = () => {
  return (
    <div className="eventora-welcome">
      <nav className="navbar eventora-navbar">
        <div className="container">
          <Link className="navbar-brand eventora-brand" to="">
            <span className="brand-icon">
              <i className="bi bi-calendar2-heart-fill"></i>
            </span>

            <span>
              Event<span className="brand-highlight">ora</span>
            </span>
          </Link>

          <div className="dropdown">
            <button
              className="btn eventora-login-btn dropdown-toggle"
              type="button"
              id="eventoraLoginDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle me-2"></i>
              Login
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end eventora-dropdown"
              aria-labelledby="eventoraLoginDropdown"
            >
              <li>
                <Link className="dropdown-item" to="/user-login">
                  <span className="dropdown-icon user-icon">
                    <i className="bi bi-person"></i>
                  </span>

                  <span>
                    <strong>User Login</strong>
                    <small>Discover and join events</small>
                  </span>
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to="/admin-login">
                  <span className="dropdown-icon admin-icon">
                    <i className="bi bi-shield-lock"></i>
                  </span>

                  <span>
                    <strong>Admin Login</strong>
                    <small>Manage events and bookings</small>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="eventora-hero">
        <div className="hero-circle hero-circle-one"></div>
        <div className="hero-circle hero-circle-two"></div>
        <div className="hero-grid"></div>

        <div className="container hero-container">
          <div className="row align-items-center">
            <div className="col-lg-7 hero-content">
              <div className="hero-label">
                <span className="label-dot"></span>
                YOUR MOMENTS, BEAUTIFULLY PLANNED
              </div>

              <h1>
                Every Great
                <br />
                Event Starts
                <br />
                <span>With an Idea.</span>
              </h1>

              <p className="hero-description">
                Turn your vision into unforgettable experiences. From personal
                celebrations to professional gatherings, Eventora brings your
                event planning journey together in one beautiful place.
              </p>

              <div className="hero-actions">
                <Link to="/user-login" className="btn hero-primary-btn">
                  Get Started
                  <i className="bi bi-arrow-up-right ms-2"></i>
                </Link>

                <div className="hero-note">
                  <span className="note-icon">
                    <i className="bi bi-stars"></i>
                  </span>

                  <span>
                    <strong>Plan with purpose.</strong>
                    <small>Celebrate with confidence.</small>
                  </span>
                </div>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="stat-icon purple-stat">
                    <i className="bi bi-calendar2-check"></i>
                  </div>

                  <div>
                    <h3>Plan</h3>
                    <p>Every detail</p>
                  </div>
                </div>

                <div className="stat-divider"></div>

                <div className="hero-stat">
                  <div className="stat-icon pink-stat">
                    <i className="bi bi-people"></i>
                  </div>

                  <div>
                    <h3>Connect</h3>
                    <p>Every person</p>
                  </div>
                </div>

                <div className="stat-divider"></div>

                <div className="hero-stat">
                  <div className="stat-icon orange-stat">
                    <i className="bi bi-stars"></i>
                  </div>

                  <div>
                    <h3>Celebrate</h3>
                    <p>Every moment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 hero-visual-column">
              <div className="event-illustration">
                <div className="illustration-orbit orbit-one"></div>
                <div className="illustration-orbit orbit-two"></div>

                <div className="illustration-center">
                  <div className="center-glow"></div>

                  <div className="calendar-art">
                    <div className="calendar-top">
                      <span></span>
                      <span></span>
                    </div>

                    <div className="calendar-header">
                      <i className="bi bi-calendar-heart"></i>
                      <span>YOUR BIG DAY</span>
                    </div>

                    <div className="calendar-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span className="active-day"></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    <div className="calendar-message">
                      <i className="bi bi-stars"></i>
                      <span>Make it memorable</span>
                    </div>
                  </div>
                </div>

                <div className="floating-icon-card floating-card-one">
                  <i className="bi bi-balloon-heart"></i>
                </div>

                <div className="floating-icon-card floating-card-two">
                  <i className="bi bi-music-note-beamed"></i>
                </div>

                <div className="floating-icon-card floating-card-three">
                  <i className="bi bi-gift"></i>
                </div>

                <div className="floating-icon-card floating-card-four">
                  <i className="bi bi-stars"></i>
                </div>

                <div className="visual-caption">
                  <span className="caption-check">
                    <i className="bi bi-check-lg"></i>
                  </span>

                  <div>
                    <strong>Your vision, organized.</strong>
                    <small>Everything begins with Eventora.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="event-types-section">
        <div className="container">
          <div className="event-types-heading">
            <div>
              <span className="section-eyebrow">
                ONE PLATFORM, MANY POSSIBILITIES
              </span>

              <h2>What are we celebrating?</h2>
            </div>

            <p>Whatever the occasion, there's room to make it special.</p>
          </div>

          <div className="row g-3">
            <div className="col-6 col-md-3">
              <div className="event-type-card">
                <div className="event-type-icon type-purple">
                  <i className="bi bi-briefcase"></i>
                </div>

                <h5>Corporate Events</h5>
                <p>Ideas, connections and growth.</p>

                <span className="category-arrow">
                  <i className="bi bi-arrow-up-right"></i>
                </span>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="event-type-card">
                <div className="event-type-icon type-pink">
                  <i className="bi bi-heart"></i>
                </div>

                <h5>Weddings</h5>
                <p>Beautiful beginnings together.</p>

                <span className="category-arrow">
                  <i className="bi bi-arrow-up-right"></i>
                </span>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="event-type-card">
                <div className="event-type-icon type-orange">
                  <i className="bi bi-music-note-beamed"></i>
                </div>

                <h5>Concerts</h5>
                <p>Music, energy and excitement.</p>

                <span className="category-arrow">
                  <i className="bi bi-arrow-up-right"></i>
                </span>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="event-type-card">
                <div className="event-type-icon type-blue">
                  <i className="bi bi-balloon-heart"></i>
                </div>

                <h5>Celebrations</h5>
                <p>Moments worth remembering.</p>

                <span className="category-arrow">
                  <i className="bi bi-arrow-up-right"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="bottom-message">
            <div className="bottom-message-icon">
              <i className="bi bi-magic"></i>
            </div>

            <div className="bottom-message-content">
              <h5>Have an idea? Let's make it happen.</h5>
              <p>Your next memorable event is just the beginning.</p>
            </div>

            <Link to="/user-login" className="bottom-message-link">
              Start Planning
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
