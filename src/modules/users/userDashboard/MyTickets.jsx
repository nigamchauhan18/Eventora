import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../../assets/MyTickets.css";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null);
  
  const loadTickets = () => {
    try {
      const savedTickets = JSON.parse(localStorage.getItem('eventoraBookings') || '[]');
      const confirmed = savedTickets.filter((ticket) =>
        ticket.bookingStatus?.toLowerCase() === 'confirmed');
      setTickets(confirmed);
    } catch (error) {
      console.error("Unable to load tickets:", error);
      setTickets([]);
    }
  }
  useEffect(() => {
    loadTickets();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Not Available";
    const parsedDate = new Date(`${date}T00:00:00`);
    if (Number.isNaN(parsedDate.getTime())) return date;
    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatBookingDate = (date) => {
    if (!date) return "Not available";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return date;
    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const generateQRValue = (ticket) => {
    return JSON.stringify({
      platform: "EVENTORA",
      bookingId: ticket.bookingId,
      eventId: ticket.eventId,
      eventName: ticket.eventName,
      ticketHolder: ticket.fullName,
      tickets: ticket.tickets,
      bookingStatus: ticket.bookingStatus,
    });
  };

  const downloadTicketPDF = async (ticket) => {
    const bookingId = ticket.bookingId;
    if (!bookingId) {
      alert("Booking ID is missing. Please update your booking information.");
      return;
    }

    try {
      setDownloadingId(bookingId);
      const ticketElement = document.getElementById(`event-ticket-${bookingId}`);
      if (!ticketElement) {
        throw new Error("Ticket information not found.");
      }

      const canvas = await html2canvas(ticketElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 12;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const imageWidth = availableWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor(121, 82, 232);

      pdf.text("EVENTORA", margin, 13);

      pdf.setFontSize(9);
      pdf.setTextColor(120, 120, 120);

      pdf.text("YOUR DIGITAL EVENT TICKET", margin, 19);

      const finalWidth =
        imageHeight > availableHeight
          ? (availableHeight / imageHeight) * imageWidth
          : imageWidth;

      const finalHeight = (canvas.height * finalWidth) / canvas.width;

      const x = (pageWidth - finalWidth) / 2;
      const y = 25;

      pdf.addImage(imageData, "PNG", x, y, finalWidth, finalHeight);

      pdf.setFontSize(8);
      pdf.setTextColor(130, 130, 130);

      pdf.text(
        "Please present your QR code at the event entrance.",
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" },
      );

      pdf.save(`Eventora-Ticket-${bookingId}.pdf`);
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("Unable to download ticket. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const totalConfirmedTickets = tickets.reduce((total, ticket) =>
    total + Number(ticket.tickets || 1), 0
  );
  const totalAmount = tickets.reduce((total, ticket) =>
    total + Number(ticket.totalPrice || 0), 0
  );

  return (
    <div className="my-tickets-page">
      <div className="tickets-page-header">
        <div>
          <span className="tickets-eyebrow">
            <i className="bi bi-ticket-perforated-fill"></i>
            EVENTORA COLLECTION
          </span>

          <h2>My Tickets</h2>

          <p>
            Manage your confirmed event bookings and download your digital
            tickets.
          </p>
        </div>

        <Link
          to="/user-dashboard/explore-events"
          className="tickets-explore-btn"
        >
          <i className="bi bi-plus-lg"></i>
          Explore Events
        </Link>
      </div>

      <div className="tickets-stats-grid">
        <div className="tickets-stat-card">
          <div className="tickets-stat-icon purple">
            <i className="bi bi-ticket-perforated"></i>
          </div>

          <div>
            <span>Confirmed Bookings</span>
            <h3>{tickets.length}</h3>
          </div>
        </div>

        <div className="tickets-stat-card">
          <div className="tickets-stat-icon green">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Confirmed Tickets</span>
            <h3>{totalConfirmedTickets}</h3>
          </div>
        </div>

        <div className="tickets-stat-card">
          <div className="tickets-stat-icon orange">
            <i className="bi bi-currency-rupee"></i>
          </div>

          <div>
            <span>Total Amount</span>
            <h3>₹{totalAmount.toLocaleString("en-IN")}</h3>
          </div>
        </div>
      </div>

      <div className="tickets-content-section">
        <div className="tickets-section-header">
          <div>
            <h3>Your Confirmed Tickets</h3>
            <p>Only successfully confirmed bookings are displayed here.</p>
          </div>

          <span className="tickets-count">{tickets.length} Confirmed</span>
        </div>

        {tickets.length > 0 ? (
          <div className="tickets-list">
            {tickets.map((ticket, index) => {
              const bookingId = ticket.bookingId || `EVENTORA-${index + 1}`;

              const qrValue = generateQRValue(ticket);

              return (
                <div
                  className="event-ticket-card"
                  id={`event-ticket-${bookingId}`}
                  key={bookingId}
                >
                  <div className="event-ticket-main">
                    <div className="event-ticket-top">
                      <span className="event-ticket-label">
                        <i className="bi bi-calendar-event"></i>
                        EVENTORA DIGITAL TICKET
                      </span>

                      <span className="ticket-status confirmed">
                        <i className="bi bi-check-circle-fill"></i>
                        Confirmed
                      </span>
                    </div>

                    <h3>{ticket.eventName || "Event Name"}</h3>

                    <div className="event-ticket-details">
                      <div className="ticket-detail-item">
                        <i className="bi bi-calendar3"></i>

                        <div>
                          <span>Event Date</span>
                          <strong>{formatDate(ticket.eventDate)}</strong>
                        </div>
                      </div>

                      <div className="ticket-detail-item">
                        <i className="bi bi-clock"></i>

                        <div>
                          <span>Event Time</span>
                          <strong>{ticket.eventTime || "Not available"}</strong>
                        </div>
                      </div>

                      <div className="ticket-detail-item">
                        <i className="bi bi-geo-alt"></i>

                        <div>
                          <span>Event Location</span>
                          <strong>
                            {ticket.eventLocation ||
                              ticket.venue ||
                              "Not available"}
                          </strong>
                        </div>
                      </div>

                      <div className="ticket-detail-item">
                        <i className="bi bi-ticket-perforated"></i>

                        <div>
                          <span>Ticket Type</span>
                          <strong>
                            {ticket.ticketType || "General Admission"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="ticket-user-details">
                      <h4>
                        <i className="bi bi-person-circle"></i>
                        Ticket Holder Information
                      </h4>

                      <div className="ticket-user-grid">
                        <div>
                          <span>Full Name</span>
                          <strong>{ticket.fullName || "Not Available"}</strong>
                        </div>

                        <div>
                          <span>Email Address</span>
                          <strong>{ticket.email || "Not Available"}</strong>
                        </div>

                        <div>
                          <span>Phone Number</span>
                          <strong>{ticket.phone || "Not Available"}</strong>
                        </div>

                        <div>
                          <span>Booking Date</span>
                          <strong>
                            {formatBookingDate(ticket.bookingDate)}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="event-ticket-footer">
                      <div>
                        <span>Booking ID</span>
                        <strong>{bookingId}</strong>
                      </div>

                      <div>
                        <span>Number of Tickets</span>
                        <strong>{ticket.tickets || 1}</strong>
                      </div>

                      <div>
                        <span>Price Per Ticket</span>
                        <strong>
                          ₹
                          {Number(ticket.pricePerTicket || 0).toLocaleString(
                            "en-IN",
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>Total Amount</span>
                        <strong className="ticket-total-price">
                          ₹
                          {Number(ticket.totalPrice || 0).toLocaleString(
                            "en-IN",
                          )}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="event-ticket-side">
                    <div className="ticket-side-top">
                      <span>SCAN YOUR TICKET</span>
                    </div>

                    <div className="ticket-qr-box">
                      <QRCodeSVG
                        value={qrValue}
                        size={150}
                        level="H"
                        bgColor="#ffffff"
                        fgColor="#241b42"
                        marginSize={3}
                      />
                    </div>

                    <p className="ticket-qr-text">
                      Your unique booking QR code
                    </p>

                    <strong className="ticket-short-id">{bookingId}</strong>

                    <button
                      type="button"
                      className="ticket-download-btn"
                      onClick={() => downloadTicketPDF(ticket)}
                      disabled={downloadingId === bookingId}
                    >
                      {downloadingId === bookingId ? (
                        <>
                          <span className="spinner-border spinner-border-sm"></span>
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-file-earmark-pdf-fill"></i>
                          Download Ticket PDF
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="tickets-empty-state">
            <div className="tickets-empty-icon">
              <i className="bi bi-ticket-perforated"></i>
            </div>

            <h3>No Confirmed Tickets Yet!</h3>

            <p>
              You don't have any confirmed event bookings. Once your booking is
              confirmed, your digital ticket will appear here.
            </p>

            <Link
              to="/user-dashboard/explore-events"
              className="tickets-empty-btn"
            >
              Explore Events
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        )}
      </div>

      <div className="tickets-info-banner">
        <div className="tickets-info-icon">
          <i className="bi bi-shield-check"></i>
        </div>

        <div>
          <h4>Your Digital Tickets Are Ready!</h4>

          <p>
            Download your ticket PDF and keep your QR code ready. Present it at
            the event entrance for booking verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
