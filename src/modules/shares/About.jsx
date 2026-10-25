import { Link } from "react-router-dom";
import "../../assets/About.css";

function About() {
  return (
    <div className="eventora-about-page">

      {/* Hero Section */}
      <section className="eventora-about-hero">
        <div className="container">
          <div className="eventora-about-hero-content">
            <span className="eventora-about-badge">
              <i className="bi bi-stars"></i>
              ABOUT EVENTORA
            </span>

            <h1>
              Making Every Event
              <span> Unforgettable.</span>
            </h1>

            <p>
              We bring people, experiences, and opportunities together.
              Discover exciting events, connect with your community, and
              create memories that last a lifetime.
            </p>

            <div className="eventora-about-hero-buttons">
              <Link
                to="/user-dashboard/explore-events"
                className="eventora-about-primary-btn"
              >
                Explore Events
                <i className="bi bi-arrow-right"></i>
              </Link>

              <Link
                to="/user-dashboard/feedback"
                className="eventora-about-secondary-btn"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="eventora-about-hero-decoration">
            <div className="eventora-about-floating-card eventora-about-card-one">
              <i className="bi bi-calendar-event"></i>
              <div>
                <strong>Discover</strong>
                <span>New experiences</span>
              </div>
            </div>

            <div className="eventora-about-illustration">
              <div className="eventora-about-illustration-circle">
                <i className="bi bi-people-fill"></i>
              </div>

              <div className="eventora-about-illustration-stars">
                <i className="bi bi-stars"></i>
                <i className="bi bi-heart-fill"></i>
                <i className="bi bi-ticket-perforated-fill"></i>
              </div>
            </div>

            <div className="eventora-about-floating-card eventora-about-card-two">
              <i className="bi bi-heart-fill"></i>
              <div>
                <strong>Connect</strong>
                <span>With your community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="eventora-about-intro">
        <div className="container">
          <div className="row align-items-center g-5">

            <div className="col-lg-6">
              <div className="eventora-about-intro-visual">
                <div className="eventora-about-intro-icon">
                  <i className="bi bi-calendar2-heart"></i>
                </div>

                <span className="eventora-about-orbit eventora-about-orbit-one"></span>
                <span className="eventora-about-orbit eventora-about-orbit-two"></span>

                <div className="eventora-about-intro-caption">
                  <i className="bi bi-stars"></i>
                  Every moment matters
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <span className="eventora-about-section-label">
                WHO WE ARE
              </span>

              <h2 className="eventora-about-section-title">
                Your Gateway to
                <span> Amazing Experiences</span>
              </h2>

              <p className="eventora-about-section-text">
                Eventora is an event discovery and management platform
                designed to make finding and organizing events easier.
                From educational workshops and professional conferences
                to music shows and community gatherings, we help users
                explore opportunities that match their interests.
              </p>

              <p className="eventora-about-section-text">
                Our goal is to simplify the event experience by bringing
                event discovery, registrations, bookings, and ticket
                management together in one convenient place.
              </p>

              <div className="eventora-about-check-list">
                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Discover events that interest you
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Manage your registrations and bookings
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Keep your event tickets organized
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="eventora-about-mission">
        <div className="container">

          <div className="eventora-about-section-heading">
            <span className="eventora-about-section-label">
              OUR PURPOSE
            </span>

            <h2 className="eventora-about-section-title">
              What Drives <span>Us Forward</span>
            </h2>

            <p>
              Everything we build is focused on making event experiences
              simpler, more accessible, and more meaningful.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-6">
              <div className="eventora-about-purpose-card">
                <div className="eventora-about-purpose-icon">
                  <i className="bi bi-bullseye"></i>
                </div>

                <h3>Our Mission</h3>

                <p>
                  To make event discovery and participation simple by
                  connecting people with meaningful experiences and
                  providing convenient tools for managing registrations,
                  bookings, and tickets.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="eventora-about-purpose-card">
                <div className="eventora-about-purpose-icon vision-icon">
                  <i className="bi bi-eye"></i>
                </div>

                <h3>Our Vision</h3>

                <p>
                  To create a connected event community where people can
                  discover new interests, build relationships, explore
                  opportunities, and make every event more memorable.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="eventora-about-features">
        <div className="container">

          <div className="eventora-about-section-heading">
            <span className="eventora-about-section-label">
              WHY EVENTORA?
            </span>

            <h2 className="eventora-about-section-title">
              Everything You Need,
              <span> All in One Place</span>
            </h2>

            <p>
              Enjoy a simpler way to discover events and manage your
              participation from start to finish.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-lg-4 col-md-6">
              <div className="eventora-about-feature-card">
                <div className="eventora-about-feature-icon">
                  <i className="bi bi-compass"></i>
                </div>

                <h4>Discover Events</h4>

                <p>
                  Explore different event categories and find experiences
                  that fit your interests.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="eventora-about-feature-card">
                <div className="eventora-about-feature-icon icon-blue">
                  <i className="bi bi-calendar-check"></i>
                </div>

                <h4>Easy Registrations</h4>

                <p>
                  Keep track of your event registrations and bookings
                  through a convenient dashboard.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="eventora-about-feature-card">
                <div className="eventora-about-feature-icon icon-pink">
                  <i className="bi bi-ticket-perforated"></i>
                </div>

                <h4>Manage Tickets</h4>

                <p>
                  Access your event tickets and keep important booking
                  information organized.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="eventora-about-feature-card">
                <div className="eventora-about-feature-icon icon-orange">
                  <i className="bi bi-calendar3"></i>
                </div>

                <h4>Stay Organized</h4>

                <p>
                  Use your event calendar to keep upcoming experiences
                  and important dates in view.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="eventora-about-feature-card">
                <div className="eventora-about-feature-icon icon-green">
                  <i className="bi bi-heart"></i>
                </div>

                <h4>Save Your Favorites</h4>

                <p>
                  Keep interesting events in your wishlist so you can
                  easily revisit them later.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="eventora-about-feature-card">
                <div className="eventora-about-feature-icon icon-indigo">
                  <i className="bi bi-chat-square-text"></i>
                </div>

                <h4>Share Feedback</h4>

                <p>
                  Share your suggestions and help us improve the event
                  discovery experience.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="eventora-about-cta">
        <div className="container">
          <div className="eventora-about-cta-content">
            <div className="eventora-about-cta-icon">
              <i className="bi bi-stars"></i>
            </div>

            <h2>
              Your Next Great Experience
              <span> Starts Here</span>
            </h2>

            <p>
              Discover something new, meet amazing people, and find
              events worth remembering.
            </p>

            <Link
              to="/user-dashboard/explore-events"
              className="eventora-about-cta-btn"
            >
              Find Your Next Event
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
