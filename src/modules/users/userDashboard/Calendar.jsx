import { useEffect, useState } from "react";
import axios from "axios";
import "../../../assets/Calendar.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1));
  const [selectedDate, setSelectedDate] = useState("2026-11-15");
  const [loading, setLoading] = useState(true);

  // Fetch Events
  const eventsAPI = async () => {
    try {
      const response = await axios.get("/data/events.json");

      const eventData = Array.isArray(response.data)
        ? response.data
        : response.data.events || [];

      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    eventsAPI();
  }, []);

  // Format Date
  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day,
    ).padStart(2, "0")}`;
  };

  // Calendar Month Information
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Previous Month
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Next Month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Today
  const goToToday = () => {
    const today = new Date();

    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(
      formatDate(today.getFullYear(), today.getMonth(), today.getDate()),
    );
  };

  // Get Events for Selected Date
  const selectedEvents = events.filter((event) => event.date === selectedDate);

  // Upcoming Events
  const upcomingEvents = [...events]
    .filter((event) => event.date >= formatDate(year, month, 1))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  // Month Events
  const monthEvents = events.filter((event) => {
    const eventDate = new Date(`${event.date}T00:00:00`);

    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });

  // Category Colors
  const getCategoryColor = (category) => {
    const colors = {
      Music: "music",
      Technology: "technology",
      Business: "business",
      "Art & Culture": "art",
      Wedding: "wedding",
      "Food & Drink": "food",
      "Health & Fitness": "fitness",
    };

    return colors[category] || "default";
  };

  // Display Month and Year
  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="eventora-calendar-page">
      {/* PAGE HEADER */}
      <div className="calendar-page-header">
        <div>
          <span className="calendar-eyebrow">EVENT PLANNER</span>

          <h2>My Calendar</h2>

          <p>Stay organized and never miss an exciting Eventora experience.</p>
        </div>

        <div className="calendar-header-icon">
          <i className="bi bi-calendar2-heart"></i>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="calendar-stats">
        <div className="calendar-stat-card">
          <div className="calendar-stat-icon purple">
            <i className="bi bi-calendar-event"></i>
          </div>

          <div>
            <span>Total Events</span>
            <h3>{events.length}</h3>
          </div>
        </div>

        <div className="calendar-stat-card">
          <div className="calendar-stat-icon pink">
            <i className="bi bi-calendar-check"></i>
          </div>

          <div>
            <span>This Month</span>
            <h3>{monthEvents.length}</h3>
          </div>
        </div>

        <div className="calendar-stat-card">
          <div className="calendar-stat-icon orange">
            <i className="bi bi-calendar-date"></i>
          </div>

          <div>
            <span>Selected Day</span>
            <h3>{selectedEvents.length}</h3>
          </div>
        </div>
      </div>

      {/* CALENDAR LAYOUT */}
      <div className="calendar-main-layout">
        {/* CALENDAR */}
        <div className="calendar-card">
          <div className="calendar-topbar">
            <div>
              <h3>{monthName}</h3>
              <p>Manage and explore your event schedule.</p>
            </div>

            <div className="calendar-navigation">
              <button
                type="button"
                onClick={goToToday}
                className="calendar-today-btn"
              >
                Today
              </button>

              <button
                type="button"
                onClick={previousMonth}
                aria-label="Previous month"
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              <button type="button" onClick={nextMonth} aria-label="Next month">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* WEEK DAYS */}
          <div className="calendar-weekdays">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* CALENDAR DATES */}
          <div className="calendar-grid">
            {/* Empty Previous Month Days */}
            {Array.from({ length: firstDay }).map((_, index) => (
              <div className="calendar-day empty" key={`empty-${index}`}></div>
            ))}

            {/* Current Month Days */}
            {Array.from({ length: totalDays }).map((_, index) => {
              const day = index + 1;

              const dateString = formatDate(year, month, day);

              const dayEvents = events.filter(
                (event) => event.date === dateString,
              );

              const today = new Date();

              const isToday =
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day;

              const isSelected = selectedDate === dateString;

              return (
                <button
                  type="button"
                  key={day}
                  className={`calendar-day ${
                    isToday ? "today" : ""
                  } ${isSelected ? "selected" : ""} ${
                    dayEvents.length ? "has-event" : ""
                  }`}
                  onClick={() => setSelectedDate(dateString)}
                >
                  <span className="calendar-date-number">{day}</span>

                  <div className="calendar-event-indicators">
                    {dayEvents.slice(0, 3).map((event) => (
                      <span
                        key={event.id}
                        className={`calendar-event-dot ${getCategoryColor(
                          event.category,
                        )}`}
                        title={event.title}
                      ></span>
                    ))}
                  </div>

                  {dayEvents.length > 0 && (
                    <span className="calendar-event-count">
                      {dayEvents.length} Event
                      {dayEvents.length > 1 ? "s" : ""}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* LEGEND */}
          <div className="calendar-legend">
            <div>
              <span className="legend-dot music"></span>
              Music
            </div>

            <div>
              <span className="legend-dot technology"></span>
              Technology
            </div>

            <div>
              <span className="legend-dot business"></span>
              Business
            </div>

            <div>
              <span className="legend-dot art"></span>
              Art & Culture
            </div>

            <div>
              <span className="legend-dot default"></span>
              Other
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="calendar-sidebar">
          {/* SELECTED DATE EVENTS */}
          <div className="calendar-sidebar-card">
            <div className="calendar-sidebar-heading">
              <div>
                <h3>Selected Date</h3>

                <p>
                  {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>

              <i className="bi bi-calendar2-week"></i>
            </div>

            {loading ? (
              <p className="calendar-empty">Loading events...</p>
            ) : selectedEvents.length === 0 ? (
              <div className="calendar-empty">
                <i className="bi bi-calendar-x"></i>
                <h4>No Events Scheduled</h4>
                <p>Select another date to explore events.</p>
              </div>
            ) : (
              <div className="calendar-event-list">
                {selectedEvents.map((event) => (
                  <div className="calendar-event-item" key={event.id}>
                    <span
                      className={`calendar-event-line ${getCategoryColor(
                        event.category,
                      )}`}
                    ></span>

                    <div className="calendar-event-item-content">
                      <span
                        className={`calendar-category-badge ${getCategoryColor(
                          event.category,
                        )}`}
                      >
                        {event.category}
                      </span>

                      <h4>{event.title}</h4>

                      <p>
                        <i className="bi bi-clock"></i>
                        {event.time}
                      </p>

                      <p>
                        <i className="bi bi-geo-alt"></i>
                        {event.location}
                      </p>

                      <h5>₹{event.price.toLocaleString("en-IN")}</h5>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* UPCOMING EVENTS */}
          <div className="calendar-sidebar-card upcoming-calendar-card">
            <div className="calendar-sidebar-heading">
              <div>
                <h3>Upcoming Events</h3>
                <p>Explore what's coming next.</p>
              </div>

              <i className="bi bi-stars"></i>
            </div>

            {loading ? (
              <p className="calendar-empty">Loading events...</p>
            ) : upcomingEvents.length === 0 ? (
              <p className="calendar-empty">No upcoming events found.</p>
            ) : (
              <div className="upcoming-event-list">
                {upcomingEvents.map((event) => (
                  <button
                    type="button"
                    key={event.id}
                    className="upcoming-event-item"
                    onClick={() => {
                      setSelectedDate(event.date);

                      const eventDate = new Date(`${event.date}T00:00:00`);

                      setCurrentDate(
                        new Date(
                          eventDate.getFullYear(),
                          eventDate.getMonth(),
                          1,
                        ),
                      );
                    }}
                  >
                    <div className="upcoming-event-date">
                      <strong>
                        {new Date(`${event.date}T00:00:00`).getDate()}
                      </strong>

                      <span>
                        {new Date(`${event.date}T00:00:00`).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                          },
                        )}
                      </span>
                    </div>

                    <div className="upcoming-event-info">
                      <h4>{event.title}</h4>
                      <p>
                        <i className="bi bi-clock"></i>
                        {event.time}
                      </p>
                    </div>

                    <i className="bi bi-chevron-right upcoming-arrow"></i>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
