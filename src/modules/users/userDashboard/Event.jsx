import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../../assets/Event.css";

const Event = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});

  const eventAPI = () => {
    axios.get('/data/events.json').then((response) => {
        const event = response.data.find((e) => e.id == id);
        setEventDetails(event);
    });
  }
  useEffect(() => {
    eventAPI();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "Date to be announced";
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price) => Number(price || 0).toLocaleString("en-IN");

  if (!eventDetails) {
    return (
      <main className="event-details-page">
        <div className="event-not-found">
          <i className="bi bi-calendar2-x"></i>
          <h2>Event Not Found</h2>
          <p>This event could not be found.</p>
          <Link to="/explore-events" className="event-back-btn">
            <i className="bi bi-arrow-left"></i>
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  const organizer = eventDetails.organizer || {};
  const highlights = eventDetails.highlights || [];
  const facilities = eventDetails.facilities || [];
  const ticketTypes = eventDetails.ticketTypes || [];

  return (
    <main className="event-details-page">
      <div className="event-details-container">
        <Link to="/user-dashboard/explore-events" className="event-back-link">
          <i className="bi bi-arrow-left"></i>
          Back to Events
        </Link>

        <section className="event-details-banner">
          <img
            src={eventDetails.image}
            alt={eventDetails.title}
            className="event-banner-image"
          />

          <div className="event-banner-overlay"></div>

          <div className="event-banner-content">
            <div className="event-banner-badges">
              <span className="event-category-badge">
                {eventDetails.category}
              </span>

              <span
                className={`event-status-badge ${
                  eventDetails.bookingOpen ? "booking-open" : "booking-closed"
                }`}
              >
                <span></span>
                {eventDetails.bookingOpen
                  ? "Booking Open"
                  : "Booking Closed"}
              </span>
            </div>

            <h1>{eventDetails.title}</h1>

            <p>
              <i className="bi bi-geo-alt-fill"></i>
              {eventDetails.location}
              {eventDetails.venue ? ` · ${eventDetails.venue}` : ""}
            </p>
          </div>
        </section>

        <div className="event-details-layout">
          <div className="event-details-main">
            <section className="event-info-card">
              <div className="event-section-heading">
                <span>ABOUT THE EVENT</span>
                <h2>Experience Something Amazing</h2>
              </div>

              <p className="event-full-description">
                {eventDetails.description ||
                  eventDetails.shortDescription ||
                  "Discover more about this exciting event."}
              </p>

              <div className="event-highlights-grid">
                <div className="event-highlight-item">
                  <div className="event-highlight-icon">
                    <i className="bi bi-calendar-event"></i>
                  </div>
                  <div>
                    <span>Date</span>
                    <strong>{formatDate(eventDetails.date)}</strong>
                  </div>
                </div>

                <div className="event-highlight-item">
                  <div className="event-highlight-icon">
                    <i className="bi bi-clock"></i>
                  </div>
                  <div>
                    <span>Time</span>
                    <strong>
                      {eventDetails.time || "To be announced"}
                    </strong>
                  </div>
                </div>

                <div className="event-highlight-item">
                  <div className="event-highlight-icon">
                    <i className="bi bi-hourglass-split"></i>
                  </div>
                  <div>
                    <span>Duration</span>
                    <strong>{eventDetails.duration || "Not specified"}</strong>
                  </div>
                </div>

                <div className="event-highlight-item">
                  <div className="event-highlight-icon">
                    <i className="bi bi-person-check"></i>
                  </div>
                  <div>
                    <span>Age Limit</span>
                    <strong>{eventDetails.ageLimit || "All ages"}</strong>
                  </div>
                </div>
              </div>
            </section>

            {highlights.length > 0 && (
              <section className="event-info-card">
                <div className="event-section-heading">
                  <span>WHAT TO EXPECT</span>
                  <h2>Event Highlights</h2>
                </div>

                <div className="event-list-grid">
                  {highlights.map((highlight, index) => (
                    <div className="event-list-item" key={index}>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {facilities.length > 0 && (
              <section className="event-info-card">
                <div className="event-section-heading">
                  <span>YOUR COMFORT MATTERS</span>
                  <h2>Facilities Available</h2>
                </div>

                <div className="event-facilities-list">
                  {facilities.map((facility, index) => (
                    <span className="event-facility-tag" key={index}>
                      <i className="bi bi-check2"></i>
                      {facility}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className="event-info-card">
              <div className="event-section-heading">
                <span>LOCATION</span>
                <h2>Where It Happens</h2>
              </div>

              <div className="event-location-card">
                <div className="event-location-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>

                <div>
                  <h3>{eventDetails.venue || "Venue to be announced"}</h3>
                  <p>
                    {eventDetails.address ||
                      eventDetails.location ||
                      "Location to be announced"}
                  </p>
                  {eventDetails.location && (
                    <span>{eventDetails.location}</span>
                  )}
                </div>
              </div>
            </section>

            {organizer.name && (
              <section className="event-info-card">
                <div className="event-section-heading">
                  <span>THE PEOPLE BEHIND IT</span>
                  <h2>Event Organizer</h2>
                </div>

                <div className="event-organizer-card">
                  <div className="event-organizer-avatar">
                    <i className="bi bi-person-fill"></i>
                  </div>

                  <div className="event-organizer-info">
                    <h3>{organizer.name}</h3>

                    {organizer.email && (
                      <a href={`mailto:${organizer.email}`}>
                        <i className="bi bi-envelope"></i>
                        {organizer.email}
                      </a>
                    )}

                    {organizer.phone && (
                      <a href={`tel:${organizer.phone}`}>
                        <i className="bi bi-telephone"></i>
                        {organizer.phone}
                      </a>
                    )}
                  </div>
                </div>
              </section>
            )}

            {eventDetails.cancellationPolicy && (
              <section className="event-info-card">
                <div className="event-section-heading">
                  <span>BEFORE YOU BOOK</span>
                  <h2>Cancellation Policy</h2>
                </div>

                <div className="event-cancellation-policy">
                  <i className="bi bi-info-circle"></i>
                  <p>{eventDetails.cancellationPolicy}</p>
                </div>
              </section>
            )}
          </div>

          <aside className="event-details-sidebar">
            <section className="event-booking-card">
              <span className="event-booking-label">TICKETS STARTING FROM</span>

              <div className="event-booking-price">
                <span>
                  {eventDetails.currency === "INR"
                    ? "₹"
                    : eventDetails.currency || "₹"}
                </span>
                {formatPrice(eventDetails.price)}
              </div>

              <p className="event-booking-description">
                Choose your ticket and get ready for an unforgettable
                experience.
              </p>

              <div className="event-ticket-stats">
                <div>
                  <span>Available Tickets</span>
                  <strong>
                    {eventDetails.availableTickets ?? "Not specified"}
                  </strong>
                </div>

                <div>
                  <span>Total Capacity</span>
                  <strong>
                    {eventDetails.capacity ?? "Not specified"}
                  </strong>
                </div>
              </div>

              {ticketTypes.length > 0 && (
                <div className="event-ticket-types">
                  <h3>Choose Your Ticket</h3>

                  {ticketTypes.map((ticket, index) => (
                    <div className="event-ticket-type" key={index}>
                      <div>
                        <i className="bi bi-ticket-perforated"></i>
                        <span>{ticket.name}</span>
                      </div>

                      <strong>
                        {eventDetails.currency === "INR" ? "₹" : eventDetails.currency || "₹"} {formatPrice(ticket.price)}
                      </strong>
                    </div>
                  ))}
                </div>
              )}

              {eventDetails.bookingOpen ? (
                <Link
                  to={`/user-dashboard/registrations/${eventDetails.id}`}
                  className="event-book-now-btn"
                >
                  Book Tickets
                  <i className="bi bi-arrow-right"></i>
                </Link>
              ) : (
                <button className="event-book-now-btn" disabled>
                  Booking Closed
                </button>
              )}

              <div className="event-booking-note">
                <i className="bi bi-shield-check"></i>
                <span>Check event details before booking.</span>
              </div>
            </section>

            {eventDetails.tags?.length > 0 && (
              <section className="event-tags-card">
                <h3>
                  <i className="bi bi-tags"></i>
                  Event Tags
                </h3>

                <div className="event-tags-list">
                  {eventDetails.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Event;
