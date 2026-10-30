import { useState } from "react";
import "../../../assets/Calendar.css";

const sampleEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    date: "2026-10-30",
    time: "10:00 AM",
    location: "Convention Center",
    category: "Conference",
    color: "purple",
  },
  {
    id: 2,
    title: "Creative Design Workshop",
    date: "2026-10-30",
    time: "02:00 PM",
    location: "Innovation Hub",
    category: "Workshop",
    color: "pink",
  },
  {
    id: 3,
    title: "Startup Networking Night",
    date: "2026-10-31",
    time: "06:00 PM",
    location: "Grand Hall",
    category: "Networking",
    color: "orange",
  },
  {
    id: 4,
    title: "Digital Marketing Conference",
    date: "2026-11-05",
    time: "11:00 AM",
    location: "Business Center",
    category: "Conference",
    color: "purple",
  },
  {
    id: 5,
    title: "Photography Masterclass",
    date: "2026-11-12",
    time: "03:00 PM",
    location: "Creative Studio",
    category: "Workshop",
    color: "pink",
  },
  {
    id: 6,
    title: "Annual Music Festival",
    date: "2026-11-20",
    time: "07:00 PM",
    location: "City Arena",
    category: "Entertainment",
    color: "orange",
  },
  {
    id: 7,
    title: "Business Leaders Meetup",
    date: "2026-12-08",
    time: "04:00 PM",
    location: "Skyline Hotel",
    category: "Networking",
    color: "purple",
  },
];

const categories = [
  "All Events",
  "Conference",
  "Workshop",
  "Networking",
  "Entertainment",
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [searchQuery, setSearchQuery] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  const getDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const todayString = getDateString(new Date());

  const visibleEvents = sampleEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === "All Events" || event.category === selectedCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const selectedEvents = visibleEvents.filter(
    (event) => event.date === selectedDate,
  );

  const upcomingEvents = visibleEvents
    .filter((event) => event.date >= todayString)
    .sort((a, b) => {
      const dateDifference = a.date.localeCompare(b.date);

      if (dateDifference !== 0) {
        return dateDifference;
      }

      return a.time.localeCompare(b.time);
    })
    .slice(0, 4);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();

    setCurrentDate(today);
    setSelectedDate(getDateString(today));
  };

  const getEventsForDate = (dateString) => {
    return visibleEvents.filter((event) => event.date === dateString);
  };

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({
      day: daysInPreviousMonth - firstDay + i + 1,
      date: getDateString(
        new Date(year, month - 1, daysInPreviousMonth - firstDay + i + 1),
      ),
      outside: true,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      date: getDateString(new Date(year, month, day)),
      outside: false,
    });
  }

  const remainingDays = 42 - calendarDays.length;

  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      date: getDateString(new Date(year, month + 1, day)),
      outside: true,
    });
  }

  const formatSelectedDate = (dateString) => {
    const date = new Date(`${dateString}T12:00:00`);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="event-calendar-page">
      {" "}
      <section className="calendar-welcome">
        {" "}
        <div className="calendar-welcome-content">
          {" "}
          <span className="calendar-eyebrow">
            {" "}
            <i className="bi bi-calendar-heart-fill"></i>
            YOUR EVENTS, PERFECTLY PLANNED{" "}
          </span>
          <h1>
            Make Every Day
            <br />
            <span>Worth Remembering.</span>
          </h1>
          <p>
            Keep track of your favorite events, explore what's coming up, and
            make every moment count with Eventora.
          </p>
          <button
            type="button"
            className="calendar-today-btn"
            onClick={goToToday}
          >
            <i className="bi bi-calendar-check"></i>
            Go to Today
          </button>
        </div>
        <div className="calendar-welcome-art">
          <div className="calendar-art-main">
            <div className="calendar-art-top">
              <i className="bi bi-calendar-heart-fill"></i>
            </div>

            <div className="calendar-art-grid">
              {Array.from({ length: 25 }, (_, index) => (
                <span
                  key={index}
                  className={[4, 8, 13, 18].includes(index) ? "marked" : ""}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>

          <div className="calendar-art-badge">
            <i className="bi bi-stars"></i>
            Plan something amazing
          </div>

          <span className="calendar-art-decoration decoration-one"></span>
          <span className="calendar-art-decoration decoration-two"></span>
        </div>
      </section>
      <section className="calendar-stats">
        <div className="calendar-stat-card">
          <div className="calendar-stat-icon purple-stat">
            <i className="bi bi-calendar-event"></i>
          </div>

          <div>
            <span>Total Events</span>
            <h3>{visibleEvents.length}</h3>
          </div>
        </div>

        <div className="calendar-stat-card">
          <div className="calendar-stat-icon pink-stat">
            <i className="bi bi-calendar2-week"></i>
          </div>

          <div>
            <span>This Month</span>
            <h3>
              {
                visibleEvents.filter((event) => {
                  const eventDate = new Date(`${event.date}T12:00:00`);

                  return (
                    eventDate.getFullYear() === year &&
                    eventDate.getMonth() === month
                  );
                }).length
              }
            </h3>
          </div>
        </div>

        <div className="calendar-stat-card">
          <div className="calendar-stat-icon orange-stat">
            <i className="bi bi-clock-history"></i>
          </div>

          <div>
            <span>Upcoming Events</span>
            <h3>
              {
                visibleEvents.filter((event) => event.date >= todayString)
                  .length
              }
            </h3>
          </div>
        </div>
      </section>
      <section className="calendar-content-section">
        <div className="calendar-section-heading">
          <div>
            <span className="calendar-section-label">YOUR SCHEDULE</span>
            <h2>Event Calendar</h2>
            <p>Explore your schedule and discover upcoming experiences.</p>
          </div>

          <div className="calendar-search">
            <i className="bi bi-search"></i>

            <input
              type="search"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="calendar-filter-row">
          <div className="calendar-category-filters">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={selectedCategory === item ? "active" : ""}
                onClick={() => setSelectedCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="calendar-main-layout">
          <div className="calendar-month-card">
            <div className="calendar-month-header">
              <div>
                <h3>{monthName}</h3>
                <p>Select a date to view its events.</p>
              </div>

              <div className="calendar-month-actions">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  aria-label="Previous month"
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="Next month"
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="calendar-grid">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div className="calendar-weekday" key={day}>
                  {day}
                </div>
              ))}

              {calendarDays.map((item, index) => {
                const dayEvents = getEventsForDate(item.date);

                return (
                  <button
                    type="button"
                    key={`${item.date}-${index}`}
                    className={[
                      "calendar-day",
                      item.outside ? "outside-month" : "",
                      item.date === todayString ? "today" : "",
                      item.date === selectedDate ? "selected-day" : "",
                      dayEvents.length > 0 ? "has-events" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      setSelectedDate(item.date);

                      if (item.outside) {
                        const clickedDate = new Date(`${item.date}T12:00:00`);

                        setCurrentDate(
                          new Date(
                            clickedDate.getFullYear(),
                            clickedDate.getMonth(),
                            1,
                          ),
                        );
                      }
                    }}
                  >
                    <span className="calendar-day-number">{item.day}</span>

                    {dayEvents.length > 0 && (
                      <span className="calendar-day-dots">
                        {dayEvents.slice(0, 3).map((event) => (
                          <span
                            key={event.id}
                            className={`calendar-event-dot ${event.color}`}
                          ></span>
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="calendar-legend">
              <span>
                <i className="legend-dot purple-stat"></i>
                Conference
              </span>

              <span>
                <i className="legend-dot pink-stat"></i>
                Workshop
              </span>

              <span>
                <i className="legend-dot orange-stat"></i>
                Other events
              </span>
            </div>
          </div>

          <aside className="calendar-selected-panel">
            <div className="calendar-selected-heading">
              <span className="calendar-section-label">YOUR SCHEDULE</span>
              <h3>Selected Date</h3>
              <p>{formatSelectedDate(selectedDate)}</p>
            </div>

            {selectedEvents.length === 0 ? (
              <div className="calendar-no-events">
                <div>
                  <i className="bi bi-calendar2-x"></i>
                </div>

                <h4>No events scheduled</h4>
                <p>
                  There are no matching events on this date. Try another date or
                  change your filters.
                </p>
              </div>
            ) : (
              <div className="calendar-selected-events">
                {selectedEvents.map((event) => (
                  <article className="calendar-event-card" key={event.id}>
                    <div
                      className={`calendar-event-accent ${event.color}`}
                    ></div>

                    <div className="calendar-event-card-content">
                      <span className="calendar-event-category">
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
                    </div>
                  </article>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
      <section className="calendar-upcoming-section">
        <div className="calendar-upcoming-heading">
          <div>
            <span className="calendar-section-label">SAVE THE DATE</span>
            <h2>Upcoming Events</h2>
            <p>Get ready for the experiences waiting for you.</p>
          </div>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="calendar-no-upcoming">
            <i className="bi bi-calendar2-x"></i>
            <p>No upcoming events match your search or category.</p>
          </div>
        ) : (
          <div className="calendar-upcoming-grid">
            {upcomingEvents.map((event) => {
              const eventDate = new Date(`${event.date}T12:00:00`);

              return (
                <article className="calendar-upcoming-card" key={event.id}>
                  <div className={`calendar-upcoming-date ${event.color}`}>
                    <span>
                      {eventDate.toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>

                    <strong>{eventDate.getDate()}</strong>
                  </div>

                  <div className="calendar-upcoming-details">
                    <span className="calendar-event-category">
                      {event.category}
                    </span>

                    <h3>{event.title}</h3>

                    <p>
                      <i className="bi bi-clock"></i>
                      {event.time}
                    </p>

                    <p>
                      <i className="bi bi-geo-alt"></i>
                      {event.location}
                    </p>

                    <button
                      type="button"
                      className="calendar-view-event-btn"
                      onClick={() => {
                        setSelectedDate(event.date);

                        const eventDate = new Date(`${event.date}T12:00:00`);

                        setCurrentDate(
                          new Date(
                            eventDate.getFullYear(),
                            eventDate.getMonth(),
                            1,
                          ),
                        );

                        document
                          .querySelector(".calendar-month-card")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                    >
                      View in calendar
                      <i className="bi bi-arrow-up-right"></i>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Calendar;
