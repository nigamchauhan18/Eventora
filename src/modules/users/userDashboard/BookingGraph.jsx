import { useEffect, useState } from "react";
import "../../../assets/BookingGraph.css";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#7952e8", "#f2a541", "#e76575"];

const BookingGraph = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("eventoraBookings")) || [];
    setBookings(savedBookings);
  }, []);

  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter((booking) =>
    booking.bookingStatus?.toLowerCase() === "confirmed"
  ).length;

  const pendingBookings = bookings.filter((booking) =>
    booking.bookingStatus?.toLowerCase() === "pending"
  ).length;

  const cancelledBookings = bookings.filter((booking) =>
    booking.bookingStatus?.toLowerCase() === "cancelled",
  ).length;

  const bookingData = [
    { name: "Confirmed", value: confirmedBookings },
    { name: "Pending", value: pendingBookings },
    { name: "Cancelled", value: cancelledBookings },
  ];

  return (
    <div className="booking-graph-container">
      <div className="booking-graph-header">
        <div>
          <span className="booking-graph-label">EVENTORA ANALYTICS</span>
          <h2>Booking Overview</h2>
          <p>Track your booking status and event reservations.</p>
        </div>
        <div className="booking-graph-icon">
          <i className="bi bi-pie-chart-fill"></i>
        </div>
      </div>
      <div className="booking-graph-summary">
        <div>
          <span>Total Bookings</span>
          <h3>{totalBookings}</h3>
        </div>
        <div>
          <span>Confirmed</span>
          <h3 className="confirmed-text">{confirmedBookings}</h3>
        </div>
        <div>
          <span>Pending</span>
          <h3 className="pending-text">{pendingBookings}</h3>
        </div>
        <div>
          <span>Cancelled</span>
          <h3 className="cancelled-text">{cancelledBookings}</h3>
        </div>
      </div>

      {totalBookings > 0 ? (
        <div className="booking-pie-chart">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bookingData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                stroke="none"
              >
                {bookingData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>

              <text
                x="50%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="pie-total-number"
              >
                {totalBookings}
              </text>

              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="pie-total-label"
              >
                Total Bookings
              </text>

              <Tooltip />
              <Legend verticalAlign="bottom" height={35} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="booking-graph-empty">
          <i className="bi bi-pie-chart"></i>
          <h3>No Booking Data</h3>
          <p>Your booking analytics will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default BookingGraph;
