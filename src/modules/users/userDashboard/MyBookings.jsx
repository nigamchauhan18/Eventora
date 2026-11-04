import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import "../../../assets/MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("eventoraBookings")) || [];
    setBookings(savedBookings);
  }, []);

  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter((booking) =>
    booking.bookingStatus === "Confirmed",
  ).length;

  let totalTickets = 0;
  for (const booking of bookings) {
    totalTickets += Number(booking.tickets || 0);
  }

  let totalSpent = 0;
  for (const booking of bookings) {
    totalSpent += Number(booking.totalPrice || 0);
  }

  const formatPrice = (price) => Number(price).toLocaleString("en-IN");

  return (
    <main className="my-bookings-page">
      {/* Page Header */}
      <section className="my-bookings-banner">
        <div className="my-bookings-banner-content">
          <div className="my-bookings-eyebrow">
            <i className="bi bi-stars"></i>
            YOUR EVENTORA ACTIVITY
          </div>

          <h1>
            My <span>Bookings</span>
          </h1>

          <p>
            All your event experiences, reservations, and tickets in one place.
          </p>
        </div>

        <div className="booking-banner-icon">
          <i className="bi bi-ticket-perforated"></i>
        </div>

        <div className="booking-banner-shape shape-one"></div>
        <div className="booking-banner-shape shape-two"></div>
      </section>

      {/* Booking Statistics */}
      <section className="booking-stats-grid">
        <div className="booking-stat-card">
          <div className="booking-stat-icon purple-icon">
            <i className="bi bi-calendar2-check"></i>
          </div>

          <div>
            <span>Total Bookings</span>
            <h3>{totalBookings}</h3>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon green-icon">
            <i className="bi bi-patch-check"></i>
          </div>

          <div>
            <span>Confirmed</span>
            <h3>{confirmedBookings}</h3>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon orange-icon">
            <i className="bi bi-ticket-perforated"></i>
          </div>

          <div>
            <span>Total Tickets</span>
            <h3>{totalTickets}</h3>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon pink-icon">
            <i className="bi bi-wallet2"></i>
          </div>

          <div>
            <span>Total Spent</span>
            <h3>₹{formatPrice(totalSpent)}</h3>
          </div>
        </div>
      </section>

      {/* Booking History */}
      <section className="booking-history-section">
        <div className="booking-section-heading">
          <div>
            <span className="booking-section-label">YOUR RESERVATIONS</span>

            <h2>Booking History</h2>

            <p>Keep track of all your booked events.</p>
          </div>

          <div className="booking-count">
            <i className="bi bi-ticket-detailed"></i>
            {totalBookings} Bookings
          </div>
        </div>

        {bookings.length > 0 ? (
          <div className="my-bookings-list">
            {bookings.map((booking) => (
              <BookingCard key={booking.bookingId} bookingDetails={booking} />
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <div className="empty-booking-icon">
              <i className="bi bi-ticket-perforated"></i>
            </div>

            <span className="empty-booking-label">NOTHING HERE YET</span>

            <h3>No Bookings Yet!</h3>

            <p>
              Your next unforgettable experience is waiting. Explore exciting
              events and reserve your tickets.
            </p>

            <a href="/user-dashboard/explore-events" className="explore-bookings-btn">
              Explore Events
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyBookings;
