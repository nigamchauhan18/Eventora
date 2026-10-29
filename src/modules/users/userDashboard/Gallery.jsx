import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../assets/Gallery.css";

const categories = [
  "All Moments",
  "Music",
  "Technology",
  "Business",
  "Art & Culture",
  "Wedding",
  "Food & Drink",
  "Health & Fitness",
];

const Gallery = () => {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Moments");
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const eventsAPI = () => {
    axios.get('/data/events.json').then((response) => {
      setEvents(response.data.filter((e) => e.image));
    });
  }
  useEffect(() => {
    eventsAPI();
  }, []);

  const filterEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search) ||
      event.location.toLowerCase().includes(search) ||
      event.category.toLowerCase().includes(search) ||
      event.venue.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = activeCategory === "All Moments" || event.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="eventora-gallery-page">
      {" "}
      <section className="gallery-hero">
        {" "}
        <div className="gallery-hero-content">
          {" "}
          <span className="gallery-eyebrow">
            {" "}
            <i className="bi bi-stars"></i>
            MOMENTS THAT MATTER{" "}
          </span>
          <h1>
            Every Event Tells
            <br />
            <span>A Beautiful Story.</span>
          </h1>
          <p>
            Explore unforgettable celebrations, inspiring experiences, and
            beautiful moments captured through Eventora.
          </p>
          <div className="gallery-hero-stats">
            <div>
              <h3>{events.length}+</h3>
              <span>Featured Events</span>
            </div>

            <div className="gallery-stat-divider"></div>

            <div>
              <h3>{new Set(events.map((event) => event.category)).size}+</h3>
              <span>Event Categories</span>
            </div>

            <div className="gallery-stat-divider"></div>

            <div>
              <h3>{filterEvents.length}</h3>
              <span>Displayed Moments</span>
            </div>
          </div>
        </div>
        <div className="gallery-hero-decoration">
          <div className="gallery-decoration-circle gallery-circle-one"></div>
          <div className="gallery-decoration-circle gallery-circle-two"></div>

          <div className="gallery-decoration-icon">
            <i className="bi bi-camera-fill"></i>
          </div>

          <div className="gallery-decoration-small">
            <i className="bi bi-heart-fill"></i>
          </div>

          <div className="gallery-decoration-sparkle">
            <i className="bi bi-stars"></i>
          </div>
        </div>
      </section>
      <section className="gallery-main">
        <div className="gallery-section-heading">
          <div>
            <span className="gallery-section-label">OUR COLLECTION</span>
            <h2>Explore the Gallery</h2>
            <p>Discover the magic behind every unforgettable event.</p>
          </div>

          <div className="gallery-count">
            <i className="bi bi-images"></i>
            <span>{filterEvents.length} Moments</span>
          </div>
        </div>

        <div className="gallery-toolbar">
          <div className="gallery-category-filters">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`gallery-filter-btn ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category === "All Moments" && <i className="bi bi-grid"></i>}
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

          <div className="gallery-search-box">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                className="gallery-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        {filterEvents.length > 0 ? (
          <div className="gallery-grid">
            {filterEvents.map((event) => (
              <article className="gallery-card" key={event.id}>
                <button
                  type="button"
                  className="gallery-image-button"
                  onClick={() => setSelectedImage(event)}
                  aria-label={`View ${event.title}`}
                >
                  <img src={event.image} alt={event.title} loading="lazy" />

                  <span className="gallery-image-category">
                    <i className="bi bi-calendar-event"></i>
                    {event.category || "Event"}
                  </span>

                  <span className="gallery-image-overlay">
                    <span className="gallery-view-icon">
                      <i className="bi bi-arrows-fullscreen"></i>
                    </span>

                    <span className="gallery-view-text">View Moment</span>
                  </span>
                </button>

                <div className="gallery-card-info">
                  <div>
                    <h3>{event.title}</h3>

                    <p>
                      <i className="bi bi-geo-alt"></i>
                      {event.location || event.venue || "Location unavailable"}
                    </p>
                  </div>

                  <Link
                    to={`/user-dashboard/explore-events/event-details/${event.id}`}
                    className="gallery-open-btn"
                    aria-label={`View details for ${event.title}`}
                  >
                    <i className="bi bi-arrow-up-right"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="gallery-empty-state">
            <div className="gallery-empty-icon">
              <i className="bi bi-images"></i>
            </div>

            <h3>No moments found</h3>

            <p>
              {events.length === 0
                ? "No gallery images are available in events.json."
                : "Try another search or select a different category."}
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Moments");
              }}
            >
              View All Moments
            </button>
          </div>
        )}

        <div className="gallery-bottom-banner">
          <div className="gallery-banner-icon">
            <i className="bi bi-calendar2-heart"></i>
          </div>

          <div className="gallery-banner-text">
            <h3>Ready to create your own memories?</h3>
            <p>Make your next celebration one to remember.</p>
          </div>

          <Link
            to="/user-dashboard/explore-events"
            className="gallery-banner-btn"
          >
            Explore Events
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>
      {selectedImage && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <img src={selectedImage.image} alt={selectedImage.title} />

            <div className="gallery-lightbox-info">
              <span>{selectedImage.category}</span>
              <h3>{selectedImage.title}</h3>

              <p>
                <i className="bi bi-geo-alt"></i>
                {selectedImage.location ||
                  selectedImage.venue ||
                  "Location unavailable"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
