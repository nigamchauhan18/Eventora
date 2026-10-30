import { Link } from "react-router-dom";
import "../../../assets/MainPage.css";
import EventsCategories from "./EventsCategories";

const MainPage = () => {
  const user = JSON.parse(localStorage.getItem("eventoraUser") || "null");

  const userName =
    user?.name ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Eventora User";

  const stats = [
    {
      title: "Upcoming Events",
      value: "12",
      icon: "bi-calendar-event",
      color: "purple",
      change: "Ready to explore",
    },
    {
      title: "My Bookings",
      value: "08",
      icon: "bi-ticket-perforated",
      color: "pink",
      change: "Your event tickets",
    },
    {
      title: "Wishlist",
      value: "06",
      icon: "bi-heart",
      color: "orange",
      change: "Saved favorites",
    },
    {
      title: "Events Attended",
      value: "15",
      icon: "bi-check-circle",
      color: "green",
      change: "Great memories made",
    },
  ];

  const quickActions = [
    {
      title: "Explore Events",
      description: "Discover exciting events.",
      icon: "bi-compass",
      link: "/user-dashboard/explore-events",
      color: "purple",
    },
    {
      title: "My Bookings",
      description: "Manage your reservations.",
      icon: "bi-ticket-perforated",
      link: "/user-dashboard/my-bookings",
      color: "pink",
    },
    {
      title: "My Wishlist",
      description: "View your favorite events.",
      icon: "bi-heart",
      link: "/user-dashboard/wishlist",
      color: "orange",
    },
    {
      title: "Event Calendar",
      description: "Check your event schedule.",
      icon: "bi-calendar3",
      link: "/user-dashboard/calendar",
      color: "green",
    },
  ];

  const featuredEvents = [
    {
      id: 1,
      title: "Global Tech Summit 2026",
      category: "Technology",
      date: "Nov 08, 2026",
      location: "New Delhi",
      price: "₹999",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700",
    },
    {
      id: 2,
      title: "Music & Beats Festival",
      category: "Entertainment",
      date: "Nov 15, 2026",
      location: "Mumbai",
      price: "₹799",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=700",
    },
    {
      id: 3,
      title: "Creative Design Workshop",
      category: "Workshop",
      date: "Nov 22, 2026",
      location: "Bangalore",
      price: "₹499",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      day: "08",
      month: "NOV",
      title: "Global Tech Summit 2026",
      time: "10:00 AM",
      location: "New Delhi",
    },
    {
      id: 2,
      day: "15",
      month: "NOV",
      title: "Music & Beats Festival",
      time: "06:00 PM",
      location: "Mumbai",
    },
    {
      id: 3,
      day: "22",
      month: "NOV",
      title: "Creative Design Workshop",
      time: "02:00 PM",
      location: "Bangalore",
    },
  ];

  const categories = [
    { name: "Technology", icon: "bi-cpu", color: "purple" },
    { name: "Music", icon: "bi-music-note-beamed", color: "pink" },
    { name: "Business", icon: "bi-briefcase", color: "orange" },
    { name: "Workshops", icon: "bi-easel", color: "green" },
    { name: "Sports", icon: "bi-trophy", color: "blue" },
    { name: "Celebrations", icon: "bi-balloon-heart", color: "pink" },
  ];

  return (
    <main className="eventora-dashboard">
      <section className="dashboard-welcome">
        <div className="dashboard-welcome-content">
          <span className="dashboard-welcome-label">
            <i className="bi bi-stars"></i>
            WELCOME TO EVENTORA
          </span>

          <h1>
            Hello, {userName.split(" ")[0]}!
            <br />
            <span>Ready for something amazing?</span>
          </h1>

          <p>
            Discover exciting experiences, find your favorite events, and create
            unforgettable memories with Eventora.
          </p>

          <div className="dashboard-welcome-actions">
            <Link
              to="/user-dashboard/explore-events"
              className="dashboard-primary-btn"
            >
              Explore Events
              <i className="bi bi-arrow-right"></i>
            </Link>

            <Link
              to="/user-dashboard/calendar"
              className="dashboard-secondary-btn"
            >
              <i className="bi bi-calendar3"></i>
              View Calendar
            </Link>
          </div>
        </div>

        <div className="dashboard-welcome-illustration">
          <div className="dashboard-illustration-circle">
            <i className="bi bi-calendar-heart-fill"></i>
          </div>

          <div className="dashboard-floating-card floating-card-one">
            <i className="bi bi-ticket-perforated-fill"></i>
            <div>
              <strong>Memorable Moments</strong>
              <span>Start your journey</span>
            </div>
          </div>

          <div className="dashboard-floating-card floating-card-two">
            <i className="bi bi-stars"></i>
            <div>
              <strong>Discover More</strong>
              <span>Something exciting awaits</span>
            </div>
          </div>

          <span className="dashboard-decoration decoration-a"></span>
          <span className="dashboard-decoration decoration-b"></span>
        </div>
      </section>

      <section className="dashboard-stats">
        {stats.map((item) => (
          <div className="dashboard-stat-card" key={item.title}>
            <div className={`dashboard-stat-icon ${item.color}`}>
              <i className={`bi ${item.icon}`}></i>
            </div>

            <div className="dashboard-stat-info">
              <span>{item.title}</span>
              <h3>{item.value}</h3>
              <small>{item.change}</small>
            </div>

            <i className="bi bi-three-dots dashboard-stat-menu"></i>
          </div>
        ))}
      </section>

      <section className="dashboard-quick-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-label">GET STARTED</span>
            <h2>Quick Actions</h2>
            <p>Everything you need, just one click away.</p>
          </div>
        </div>

        <div className="dashboard-quick-grid">
          {quickActions.map((item) => (
            <Link
              to={item.link}
              className="dashboard-quick-card"
              key={item.title}
            >
              <div className={`dashboard-quick-icon ${item.color}`}>
                <i className={`bi ${item.icon}`}></i>
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <i className="bi bi-arrow-up-right dashboard-quick-arrow"></i>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-featured-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-label">HANDPICKED FOR YOU</span>
            <h2>Featured Events</h2>
            <p>Explore some of the most exciting upcoming experiences.</p>
          </div>

          <Link
            to="/user-dashboard/explore-events"
            className="dashboard-view-all"
          >
            View All Events
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="dashboard-featured-grid">
          {featuredEvents.map((event) => (
            <article className="dashboard-event-card" key={event.id}>
              <div className="dashboard-event-image">
                <img src={event.image} alt={event.title} />

                <span className="dashboard-event-category">
                  {event.category}
                </span>

                <button
                  type="button"
                  className="dashboard-event-heart"
                  aria-label={`Save ${event.title}`}
                >
                  <i className="bi bi-heart"></i>
                </button>
              </div>

              <div className="dashboard-event-details">
                <h3>{event.title}</h3>

                <p>
                  <i className="bi bi-calendar3"></i>
                  {event.date}
                </p>

                <p>
                  <i className="bi bi-geo-alt"></i>
                  {event.location}
                </p>

                <div className="dashboard-event-bottom">
                  <div>
                    <span>Starting from</span>
                    <strong>{event.price}</strong>
                  </div>

                  <Link
                    to={`/user-dashboard/explore-events/event-details/${event.id}`}
                    className="dashboard-event-btn"
                  >
                    Explore
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-bottom-grid">
        <div className="dashboard-upcoming-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">SAVE THE DATE</span>
              <h2>Upcoming Events</h2>
            </div>

            <Link to="/user-dashboard/calendar" className="dashboard-text-link">
              View Calendar
            </Link>
          </div>

          <div className="dashboard-upcoming-list">
            {upcomingEvents.map((event) => (
              <div className="dashboard-upcoming-item" key={event.id}>
                <div className="dashboard-upcoming-date">
                  <strong>{event.day}</strong>
                  <span>{event.month}</span>
                </div>

                <div className="dashboard-upcoming-info">
                  <h3>{event.title}</h3>

                  <p>
                    <i className="bi bi-clock"></i>
                    {event.time}
                  </p>

                  <p>
                    <i className="bi bi-geo-alt"></i>
                    {event.location}
                  </p>
                </div>

                <i className="bi bi-arrow-up-right dashboard-upcoming-arrow"></i>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="dashboard-categories-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">
                FIND YOUR INTEREST
              </span>
              <h2>Categories</h2>
            </div>
          </div>

          <div className="dashboard-category-grid">
            {categories.map((item) => (
              <Link
                to="/user-dashboard/explore-events"
                className="dashboard-category-card"
                key={item.name}
              >
                <div className={`dashboard-category-icon ${item.color}`}>
                  <i className={`bi ${item.icon}`}></i>
                </div>

                <span>{item.name}</span>
                <i className="bi bi-arrow-up-right"></i>
              </Link>
            ))}
          </div>
        </div> */}

        <div className="dashboard-categories-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">
                FIND YOUR INTEREST
              </span>
              <h2>Events Categories</h2>
              <p>Explore events based on their categories.</p>
            </div>

            <Link
              to="/user-dashboard/explore-events"
              className="dashboard-view-all"
            >
              Explore All
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <EventsCategories />
        </div>
      </section>

      <section className="dashboard-bottom-banner">
        <div className="dashboard-bottom-banner-icon">
          <i className="bi bi-calendar-heart-fill"></i>
        </div>

        <div>
          <h2>Every great memory starts somewhere.</h2>
          <p>Find your next favorite experience with Eventora.</p>
        </div>

        <Link to="/user-dashboard/explore-events">
          Find Your Next Event
          <i className="bi bi-arrow-right"></i>
        </Link>
      </section>
    </main>
  );
};

export default MainPage;
