import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../assets/ExploreEvents.css";

const categories = [
  "All Events",
  "Music",
  "Technology",
  "Business",
  "Art & Culture",
  "Wedding",
  "Food & Drink",
  "Health & Fitness",
];

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);

  const eventsAPI = () => {
    axios.get("/data/events.json").then((response) => {
      setEvents(response.data);
    });
  }
  useEffect(() => {
    eventsAPI();
  }, []);

  const handleWishlist  = (event) => {
     let updatedWishlist = [];
     const exists = wishlist.find((item) => item.id === event.id);
     if (exists) {
      updatedWishlist = wishlist.filter((item) => item.id !== event.id);
     } else {
      updatedWishlist = wishlist.concat(event);
     }
     setWishlist(updatedWishlist);
     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }

  const filterEvents = events.filter((event) => {
    const matchSearch =
      event.title.toLowerCase().includes(search) ||
      event.location.toLowerCase().includes(search) ||
      event.category.toLowerCase().includes(search) ||
      event.venue.toLowerCase().includes(search.toLowerCase());
    
      const matchCategory = activeCategory === "All Events" || event.category.toLowerCase() === activeCategory.toLowerCase();
    return matchSearch && matchCategory;
  });

  const formatDate = (date) => {
    if (!date) {
      return "Date to be announced";
    }
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const formatPrice = (price) => Number(price || 0).toLocaleString("en-IN");

  return (
    <main className="explore-page">
      <section className="explore-hero">
        <div className="explore-hero-content">
          <span className="explore-eyebrow">
            <i className="bi bi-stars"></i> MAKE EVERY MOMENT COUNT
          </span>

          <h1>
            Discover Events.
            <br />
            <span>Make Memories.</span>
          </h1>

          <p>
            Find exciting experiences, meet amazing people, and explore your
            next unforgettable event with Eventora.
          </p>

          <div className="explore-search">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search events, categories, or locations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                className="explore-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>

          <div className="explore-hero-stats">
            <div>
              <strong>{events.length}+</strong>
              <span>Events</span>
            </div>
            <div>
              <strong>{categories.length - 1}</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>All India</strong>
              <span>Experiences</span>
            </div>
          </div>
        </div>
        <div className="explore-hero-decoration">
          <div className="explore-decoration-icon">
            <i className="bi bi-calendar2-heart"></i>
          </div>
          <div className="explore-decoration-card">
            <i className="bi bi-ticket-perforated-fill"></i>
            <div>
              <strong>Your next adventure</strong>
              <span>Starts right here</span>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-events-section">
        <div className="explore-section-heading">
          <div>
            <span className="explore-section-label">FIND YOUR EXPERIENCE</span>
            <h2>Explore Events</h2>
            <p>Discover something exciting happening near you.</p>
          </div>
          <div className="explore-result-count">
            <i className="bi bi-calendar-check"></i>
            {filterEvents.length} events found
          </div>
        </div>
        <div className="explore-category-list">
          {categories.map((category) => (
            <button type="button" key={category} className={`explore-category-btn ${ activeCategory === category ? "active" : "" }`} onClick={() => setActiveCategory(category)} >
              {category === "All Events" && <i className="bi bi-grid"></i>}
              {category === "Music" && <i className="bi bi-music-note-beamed"></i>}
              {category === "Technology" && <i className="bi bi-cpu"></i>}
              {category === "Business" && <i className="bi bi-briefcase"></i>}
              {category === "Art & Culture" && <i className="bi bi-palette"></i>}
              {category === "Wedding" && <i className="bi bi-heart"></i>}
              {category === "Food & Drink" && <i className="bi bi-cup-hot"></i>}
              {category === "Health & Fitness" && <i className="bi bi-heart-pulse"></i>}
              {category}
            </button>
          ))}
        </div>

        {filterEvents.length > 0 ? (
          <div className="explore-events-grid">
            {filterEvents.map((event) => (
              <Link
                to={`event-details/${event.id}`}
                className="explore-event-card"
                key={event.id}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div className="explore-event-image-wrapper">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="explore-event-image"
                    loading="lazy"
                  />

                  <span className="explore-event-category">
                    {event.category}
                  </span>

                  <button
                    type="button"
                    className={`explore-wishlist-btn ${
                      wishlist.find((item) => item.id === event.id) ? "wishlisted" : "" }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleWishlist(event);
                      }}>
                    <i className={`bi ${ wishlist.find((item) => item.id === event.id) ? "bi-heart-fill" : "bi-heart" }`}></i>
                  </button>

                  <span className="explore-event-price">
                    ₹{formatPrice(event.price)}
                  </span>
                </div>

                <div className="explore-event-content">
                  <div className="explore-event-date">
                    <i className="bi bi-calendar-event"></i>

                    {formatDate(event.date)}

                    <span className="explore-date-dot"></span>

                    <i className="bi bi-clock"></i>

                    {event.time || "Time to be announced"}
                  </div>

                  <h3>{event.title}</h3>

                  <p className="explore-event-description">
                    {event.description || event.shortDescription}
                  </p>

                  <div className="explore-event-location">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>{event.location}</span>
                  </div>

                  <div className="explore-event-venue">
                    <i className="bi bi-building"></i>
                    <span>{event.venue}</span>
                  </div>

                  <div className="explore-event-card-footer">
                    <div className="explore-event-price-label">
                      <span>Starting from</span>

                      <strong>₹{formatPrice(event.price)}</strong>
                    </div>

                    <span className="explore-book-btn">
                      Explore
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="explore-empty-state">
            <div className="explore-empty-icon">
              <i className="bi bi-calendar2-x"></i>
            </div>

            <h3>No events found</h3>

            <p>Try another search or select a different event category.</p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Events");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ExploreEvents;
