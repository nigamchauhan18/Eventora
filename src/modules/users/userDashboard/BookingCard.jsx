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
    return String(id).slice(-8);
  };

  return (
    <div className="booking-history-card">
      <div className="booking-history-header">
        <div>
          <span className="booking-id">
            Booking ID: #{formatBookingId(props.bookingDetails.bookingId)}
          </span>

          <h3>{props.bookingDetails.eventName}</h3>

          <span className="booking-date">
            <i className="bi bi-calendar-check"></i>
            Booked on {formatDate(props.bookingDetails.bookingDate)}
          </span>
        </div>

        <span
          className={`booking-status ${props.bookingDetails.bookingStatus.toLowerCase()}`}
        >
          <i className="bi bi-circle-fill"></i>
          {props.bookingDetails.bookingStatus}
        </span>
      </div>

      <div className="booking-history-details">
        <div className="booking-history-item">
          <i className="bi bi-calendar-event"></i>

          <div>
            <span>Event Date</span>
            <strong>{formatDate(props.bookingDetails.eventDate)}</strong>
          </div>
        </div>

        <div className="booking-history-item">
          <i className="bi bi-clock"></i>

          <div>
            <span>Event Time</span>
            <strong>{props.bookingDetails.eventTime || "Not Specified"}</strong>
          </div>
        </div>

        <div className="booking-history-item">
          <i className="bi bi-geo-alt"></i>

          <div>
            <span>Location</span>
            <strong>
              {props.bookingDetails.eventLocation || "Not Available"}
            </strong>
          </div>
        </div>

        <div className="booking-history-item">
          <i className="bi bi-building"></i>

          <div>
            <span>Venue</span>
            <strong>{props.bookingDetails.venue || "Not Available"}</strong>
          </div>
        </div>

        <div className="booking-history-item">
          <i className="bi bi-ticket-perforated"></i>

          <div>
            <span>Ticket Type</span>
            <strong>
              {props.bookingDetails.ticketType || "General Admission"}
            </strong>
          </div>
        </div>

        <div className="booking-history-item">
          <i className="bi bi-person"></i>

          <div>
            <span>Booked By</span>
            <strong>{props.bookingDetails.fullName}</strong>
          </div>
        </div>
      </div>

      <div className="booking-customer-details">
        <div className="booking-customer-heading">
          <i className="bi bi-person-vcard"></i>
          Customer Information
        </div>

        <div className="booking-customer-info">
          <div>
            <span>Email Address</span>
            <strong>{props.bookingDetails.email}</strong>
          </div>

          <div>
            <span>Phone Number</span>
            <strong>{props.bookingDetails.phone}</strong>
          </div>
        </div>
      </div>

      <div className="booking-history-footer">
        <div>
          <span>Tickets</span>
          <strong>{props.bookingDetails.tickets}</strong>
        </div>

        <div>
          <span>Price Per Ticket</span>
          <strong>₹{formatPrice(props.bookingDetails.pricePerTicket)}</strong>
        </div>

        <div>
          <span>Total Amount</span>
          <strong className="booking-total-price">
            ₹{formatPrice(props.bookingDetails.totalPrice)}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
