import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);
  const [search, setSearch] = useState("");

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((event) => event.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const formatDate = (date) => {
    if (!date) {
      return "Date to be announced";
    }
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-IN", {
      weekday: 'long',
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN");
  };
  const filteredWishlist = wishlist.filter((event) => {
    const searchValue = search.toLowerCase();
    
    const matchSearch =
      event.title.toLowerCase().includes(searchValue) ||
      event.category.toLowerCase().includes(searchValue) ||
      event.location.toLowerCase().includes(searchValue) ||
      event.venue.toLowerCase().includes(searchValue);

    return matchSearch;
  });

  return (
    <main className="wishlist-page">
      {" "}
      <section className="wishlist-hero">
        {" "}
        <div className="wishlist-hero-content">
          {" "}
          <span className="wishlist-eyebrow">
            {" "}
            <i className="bi bi-heart-fill"></i>
            YOUR PERSONAL COLLECTION{" "}
          </span>
          <h1>
            Events You <span>Love.</span>
          </h1>
          <p>
            Keep your favorite experiences close. All the events you love,
            together in one place.
          </p>
          <div className="wishlist-hero-stats">
            <div className="wishlist-stat-icon">
              <i className="bi bi-heart-fill"></i>
            </div>

            <div>
              <strong>{wishlist.length}</strong>
              <span>
                {wishlist.length === 1 ? "Saved Event" : "Saved Events"}
              </span>
            </div>
          </div>
        </div>
        <div className="wishlist-hero-decoration">
          <div className="wishlist-heart-circle">
            <i className="bi bi-heart-fill"></i>
          </div>

          <div className="wishlist-floating-card">
            <i className="bi bi-stars"></i>
            <div>
              <strong>Made for you</strong>
              <span>Your next favorite memory</span>
            </div>
          </div>

          <div className="wishlist-decoration-dot dot-one"></div>
          <div className="wishlist-decoration-dot dot-two"></div>
          <div className="wishlist-decoration-dot dot-three"></div>
        </div>
      </section>
      <section className="wishlist-content">
        <div className="wishlist-section-heading">
          <div>
            <span className="wishlist-section-label">YOUR COLLECTION</span>
            <h2>My Wishlist</h2>
            <p>Every saved event, ready when you are.</p>
          </div>

          {wishlist.length > 0 && (
            <div className="wishlist-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search your wishlist..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-illustration">
              <i className="bi bi-heart"></i>
              <span>
                <i className="bi bi-plus"></i>
              </span>
            </div>

            <h3>Your wishlist is waiting for a little love!</h3>

            <p>
              You haven't saved any events yet. Explore exciting experiences and
              tap the heart icon to keep your favorites here.
            </p>

            <Link
              to="/user-dashboard/explore-events"
              className="wishlist-explore-btn"
            >
              <i className="bi bi-compass"></i>
              Explore Events
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        ) : filteredWishlist.length === 0 ? (
          <div className="wishlist-no-results">
            <i className="bi bi-search"></i>
            <h3>No matching events found</h3>
            <p>Try searching with another event name, category, or location.</p>

            <button type="button" onClick={() => setSearch("")}>
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <div className="wishlist-results-info">
              <span>
                Showing <strong>{filteredWishlist.length}</strong>{" "}
                {filteredWishlist.length === 1 ? "event" : "events"}
              </span>

              <Link to="/user-dashboard/explore-events">
                <i className="bi bi-plus-circle"></i>
                Discover more events
              </Link>
            </div>

            <div className="wishlist-grid">
              {filteredWishlist.map((event) => (
                <article className="wishlist-card" key={event.id}>
                  <div className="wishlist-card-image-wrapper">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="wishlist-card-image"
                      loading="lazy"
                    />

                    <span className="wishlist-card-category">
                      {event.category || "Event"}
                    </span>

                    <button
                      type="button"
                      className="wishlist-remove-btn"
                      title="Remove from wishlist"
                      aria-label={`Remove ${event.title} from wishlist`}
                      onClick={() => removeFromWishlist(event.id)}
                    >
                      <i className="bi bi-heart-fill"></i>
                    </button>

                    <div className="wishlist-image-price">
                      ₹{formatPrice(event.price)}
                    </div>
                  </div>

                  <div className="wishlist-card-body">
                    <div className="wishlist-card-date">
                      <i className="bi bi-calendar-event"></i>
                      <span>{formatDate(event.date)}</span>

                      <span className="wishlist-date-divider"></span>

                      <i className="bi bi-clock"></i>
                      <span>{event.time || "Time TBA"}</span>
                    </div>

                    <h3>{event.title}</h3>

                    <p className="wishlist-card-description">
                      {event.shortDescription ||
                        event.description ||
                        "Discover an unforgettable experience with Eventora."}
                    </p>

                    <div className="wishlist-card-location">
                      <i className="bi bi-geo-alt-fill"></i>
                      <span>
                        {event.location || "Location to be announced"}
                      </span>
                    </div>

                    {event.venue && (
                      <div className="wishlist-card-venue">
                        <i className="bi bi-building"></i>
                        <span>{event.venue}</span>
                      </div>
                    )}

                    <div className="wishlist-card-footer">
                      <div className="wishlist-price">
                        <span>Starting from</span>
                        <strong>₹{formatPrice(event.price)}</strong>
                      </div>

                      <Link
                        to={`/user-dashboard/explore-events/event-details/${event.id}`}
                        className="wishlist-view-btn"
                      >
                        View Event
                        <i className="bi bi-arrow-up-right"></i>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Wishlist;
