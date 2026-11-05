import "../../../assets/BookingCard.css";

const BookingCard = (props) => {
  const formatDate = (date) => {
    if (!date) return "Date not available";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN");
  };
  const formatBookingId = (id) => {
    return String(id || "").slice(-8);
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (confirmCancel) {
      props.onCancel(props.bookingDetails.bookingId);
    }
  };
  const status = props.bookingDetails.bookingStatus || "Confirmed";

  return (
    <div className={`booking-history-card ${status.toLowerCase()}`}>
      <div className="booking-card-header">
        <div className="booking-card-event-info">
          <div className="booking-card-ticket-icon">
            <i className="bi bi-ticket-perforated-fill"></i>
          </div>
          <div>
            <span className="booking-id">
              BOOKING ID: #{formatBookingId(props.bookingDetails.bookingId)}
            </span>
            <h3>{props.bookingDetails.eventName}</h3>
            <span className="booking-date">
              <i className="bi bi-calendar-check"></i>
              Booked on {formatDate(props.bookingDetails.bookingDate)}
            </span>
          </div>
        </div>
        <span className={`booking-status ${status.toLowerCase()}`}>
          <i className="bi bi-circle-fill"></i> {status}
        </span>
      </div>

      <div className="booking-card-details">
        <div className="booking-detail-item">
          <div className="booking-detail-icon purple">
            <i className="bi bi-calendar-event"></i>
          </div>

          <div>
            <span>Event Date</span>
            <strong>{formatDate(props.bookingDetails.eventDate)}</strong>
          </div>
        </div>

        <div className="booking-detail-item">
          <div className="booking-detail-icon orange">
            <i className="bi bi-clock"></i>
          </div>

          <div>
            <span>Event Time</span>
            <strong>{props.bookingDetails.eventTime || "Not Specified"}</strong>
          </div>
        </div>

        <div className="booking-detail-item">
          <div className="booking-detail-icon green">
            <i className="bi bi-geo-alt"></i>
          </div>

          <div>
            <span>Location</span>
            <strong>{props.bookingDetails.eventLocation || "Not Available"}</strong>
          </div>
        </div>

        <div className="booking-detail-item">
          <div className="booking-detail-icon pink">
            <i className="bi bi-building"></i>
          </div>

          <div>
            <span>Venue</span>
            <strong>{props.bookingDetails.venue || "Not Available"}</strong>
          </div>
        </div>

        <div className="booking-detail-item">
          <div className="booking-detail-icon blue">
            <i className="bi bi-ticket"></i>
          </div>

          <div>
            <span>Ticket Type</span>
            <strong>{props.bookingDetails.ticketType || "General Admission"}</strong>
          </div>
        </div>

        <div className="booking-detail-item">
          <div className="booking-detail-icon violet">
            <i className="bi bi-person"></i>
          </div>

          <div>
            <span>Booked By</span>
            <strong>{props.bookingDetails.fullName || "Not Available"}</strong>
          </div>
        </div>
      </div>

      <div className="booking-customer-section">
        <div className="booking-customer-title">
          <i className="bi bi-person-vcard"></i>
          Customer Information
        </div>
        <div className="booking-customer-details">
          <div>
            <span>Email Address</span>
            <strong>{props.bookingDetails.email || "Not Available"}</strong>
          </div>
          <div>
            <span>Phone Number</span>
            <strong>{props.bookingDetails.phone || "Not Available"}</strong>
          </div>
        </div>
      </div>

      <div className="booking-card-footer">
        <div className="booking-price-details">
          <div>
            <span>Tickets</span>
            <strong>{props.bookingDetails.tickets || 0}</strong>
          </div>

          <div>
            <span>Price / Ticket</span>
            <strong>₹{formatPrice(props.bookingDetails.pricePerTicket)}</strong>
          </div>

          <div className="booking-total">
            <span>Total Amount</span>
            <strong>₹{formatPrice(props.bookingDetails.totalPrice)}</strong>
          </div>
        </div>

        <div className="booking-action">
          {status.toLowerCase() !== "cancelled" ? (
            <button
              type="button"
              className="cancel-booking-btn"
              onClick={handleCancel}
            >
              <i className="bi bi-x-circle"></i>
              Cancel Booking
            </button>
          ) : (
            <span className="cancelled-message">
              <i className="bi bi-check-circle-fill"></i>
              Booking Cancelled
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
