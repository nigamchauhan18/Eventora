import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../../assets/Event.css";
import "../../../assets/BookingModal.css";

const Event = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});

  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);

  // User booking form data
  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tickets: 1,
  });

  // Handle form inputs
  const handleBookingChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate total price
  const totalPrice =
    Number(eventDetails.price || 0) * Number(bookingData.tickets || 0);

  // Submit booking
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const booking = {
      bookingId: Date.now(),
      eventId: eventDetails.id,
      eventName: eventDetails.title,
      eventDate: eventDetails.date,
      eventTime: eventDetails.time,
      eventLocation: eventDetails.location,
      venue: eventDetails.venue,

      fullName: bookingData.fullName,
      email: bookingData.email,
      phone: bookingData.phone,
      tickets: Number(bookingData.tickets),

      pricePerTicket: Number(eventDetails.price),
      totalPrice: totalPrice,

      bookingDate: new Date().toISOString(),
      bookingStatus: "Confirmed",
    };

    // Get existing bookings
    const existingBookings =
      JSON.parse(localStorage.getItem("eventoraBookings")) || [];

    // Add new booking
    existingBookings.push(booking);

    // Save bookings
    localStorage.setItem("eventoraBookings", JSON.stringify(existingBookings));

    // Success notification
    toast.success("Your booking has been confirmed!");

    // Reset form
    setBookingData({
      fullName: "",
      email: "",
      phone: "",
      tickets: 1,
    });

    // Close modal
    setShowBookingModal(false);
  };

  const eventAPI = () => {
    axios.get("/data/events.json").then((response) => {
      const event = response.data.find((e) => e.id == id);
      setEventDetails(event);
    });
  };
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
                {eventDetails.bookingOpen ? "Booking Open" : "Booking Closed"}
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
                    <strong>{eventDetails.time || "To be announced"}</strong>
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
                  <strong>{eventDetails.capacity ?? "Not specified"}</strong>
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
                        {eventDetails.currency === "INR"
                          ? "₹"
                          : eventDetails.currency || "₹"}{" "}
                        {formatPrice(ticket.price)}
                      </strong>
                    </div>
                  ))}
                </div>
              )}

              {eventDetails.bookingOpen ? (
                <button
                  type="button"
                  className="event-book-now-btn"
                  onClick={() => setShowBookingModal(true)}
                >
                  Book Tickets
                  <i className="bi bi-arrow-right"></i>
                </button>
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

      {/* Booking Registration Modal */}
      {showBookingModal && (
        <div
          className="booking-modal-overlay"
          onClick={() => setShowBookingModal(false)}
        >
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="booking-modal-header">
              <div>
                <span className="booking-eyebrow">EVENTORA BOOKING</span>

                <h2>Complete Your Booking</h2>

                <p>Fill in your details to reserve your tickets.</p>
              </div>

              <button
                type="button"
                className="booking-close-btn"
                onClick={() => setShowBookingModal(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Selected Event Details */}
            <div className="booking-event-info">
              <div className="booking-event-icon">
                <i className="bi bi-calendar-event"></i>
              </div>

              <div>
                <h3>{eventDetails.title}</h3>

                <p>
                  <i className="bi bi-calendar3"></i>
                  {formatDate(eventDetails.date)}
                </p>

                <p>
                  <i className="bi bi-clock"></i>
                  {eventDetails.time}
                </p>

                <p>
                  <i className="bi bi-geo-alt"></i>
                  {eventDetails.location}
                </p>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleBookingSubmit}>
              <h4 className="booking-section-title">
                <i className="bi bi-person-circle"></i>
                Personal Information
              </h4>

              {/* Full Name */}
              <div className="booking-form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={bookingData.fullName}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              {/* Email and Phone */}
              <div className="booking-form-row">
                <div className="booking-form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={bookingData.email}
                    onChange={handleBookingChange}
                    required
                  />
                </div>

                <div className="booking-form-group">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit phone number"
                    value={bookingData.phone}
                    onChange={handleBookingChange}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              {/* Ticket Information */}
              <h4 className="booking-section-title">
                <i className="bi bi-ticket-perforated"></i>
                Ticket Information
              </h4>

              <div className="booking-form-group">
                <label>Number of Tickets</label>

                <input
                  type="number"
                  name="tickets"
                  min="1"
                  max={Math.max(1, Number(eventDetails.availableTickets) || 1)}
                  value={bookingData.tickets}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              {/* Price Summary */}
              <div className="booking-price-box">
                <div>
                  <span>Price Per Ticket</span>
                  <strong>₹{formatPrice(eventDetails.price)}</strong>
                </div>

                <div>
                  <span>Number of Tickets</span>
                  <strong>{bookingData.tickets}</strong>
                </div>

                <div className="booking-total">
                  <span>Total Amount</span>
                  <strong>₹{formatPrice(totalPrice)}</strong>
                </div>
              </div>

              {/* Confirm Booking */}
              <button type="submit" className="booking-confirm-btn">
                Confirm Booking
                <i className="bi bi-arrow-right"></i>
              </button>

              <p className="booking-note">
                <i className="bi bi-shield-check"></i>
                Your booking information will be saved in your account demo.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Event;
