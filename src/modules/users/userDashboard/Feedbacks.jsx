import { useState } from "react";
import "../../../assets/Feedback.css";

const Feedbacks = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("Overall Experience");
  const [experience, setExperience] = useState("Happy");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const [feedbacks, setFeedbacks] = useState(JSON.parse(localStorage.getItem("eventoraFeedbacks")) || []);

  const storedUser = JSON.parse(localStorage.getItem("eventoraUser") || "null");
  const userName = storedUser.fullName || "Eventora User";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setSuccess("");
      alert("Please select a star rating.");
      return;
    }
    if (!message.trim()) {
      setSuccess("");
      alert("Please write your feedback.");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name: userName,
      rating: rating,
      category: category,
      experience: experience,
      message: message.trim(),
      date: new Date().toISOString().split('T')[0],
    };
    const updatedFeedbacks = [newFeedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);    
    localStorage.setItem("eventoraFeedbacks", JSON.stringify(updatedFeedbacks));
    
    setRating(0);
    setHoverRating(0);
    setCategory("Overall Experience");
    setExperience("Happy");
    setMessage("");
    setSuccess("Thank you! Your feedback has been submitted successfully.");
    setTimeout(() => {
      setSuccess("");
    }, 4000);
  };

  let totalRating = 0;
  for (const item of feedbacks) {
    totalRating += item.rating;
  }
  const averageRating = feedbacks.length > 0 ? (totalRating / feedbacks.length).toFixed(1) : '0.0';

  const deleteFeedback = (id) => {
    const updatedFeedbacks = feedbacks.filter((item) => item.id !== id);
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("eventoraFeedbacks", JSON.stringify(updatedFeedbacks));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="feedback-page">
      {" "}
      <section className="feedback-hero">
        {" "}
        <div className="feedback-hero-content">
          {" "}
          <span className="feedback-eyebrow">
            {" "}
            <i className="bi bi-chat-heart-fill"></i>
            YOUR VOICE MATTERS{" "}
          </span>
          <h1>
            Help Us Create
            <br />
            <span>Better Experiences.</span>
          </h1>
          <p>
            Your feedback helps us make every Eventora experience more
            memorable. Share your thoughts and help us grow.
          </p>
          <div className="feedback-hero-stats">
            <div className="feedback-stat">
              <div className="feedback-stat-icon">
                <i className="bi bi-chat-square-heart-fill"></i>
              </div>

              <div>
                <strong>{feedbacks.length}</strong>
                <span>Feedbacks Shared</span>
              </div>
            </div>

            <div className="feedback-stat">
              <div className="feedback-stat-icon rating-icon">
                <i className="bi bi-star-fill"></i>
              </div>

              <div>
                <strong>{averageRating}</strong>
                <span>Average Rating</span>
              </div>
            </div>
          </div>
        </div>
        <div className="feedback-hero-art">
          <div className="feedback-art-circle">
            <i className="bi bi-chat-square-heart-fill"></i>
            <div className="feedback-art-stars">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
          </div>

          <div className="feedback-floating-note">
            <i className="bi bi-heart-fill"></i>
            <div>
              <strong>We listen to you</strong>
              <span>Every opinion counts</span>
            </div>
          </div>

          <span className="feedback-art-dot dot-a"></span>
          <span className="feedback-art-dot dot-b"></span>
          <span className="feedback-art-dot dot-c"></span>
        </div>
      </section>
      <section className="feedback-main-section">
        <div className="feedback-section-heading">
          <span className="feedback-section-label">TELL US EVERYTHING</span>
          <h2>Share Your Feedback</h2>
          <p>Tell us what you loved and what we can do better.</p>
        </div>

        <div className="feedback-layout">
          <form className="feedback-form-card" onSubmit={handleSubmit}>
            <div className="feedback-form-heading">
              <div className="feedback-form-icon">
                <i className="bi bi-pencil-square"></i>
              </div>

              <div>
                <h3>Write a Review</h3>
                <p>Your honest opinion makes a difference.</p>
              </div>
            </div>

            {success && (
              <div className="feedback-success-message" role="status">
                <i className="bi bi-check-circle-fill"></i>
                <span>{success}</span>
              </div>
            )}

            <div className="feedback-field">
              <label>How would you rate your experience?</label>

              <div className="feedback-star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`feedback-star ${
                      star <= (hoverRating || rating) ? "active" : ""
                    }`}
                    onClick={() => setRating(star)}
                    aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
                    aria-pressed={rating === star}
                  >
                    <i className="bi bi-star-fill"></i>
                  </button>
                ))}
              </div>

              <span className="feedback-rating-hint">
                {rating === 0
                  ? "Select a rating from 1 to 5 stars"
                  : rating === 1
                    ? "Poor experience"
                    : rating === 2
                      ? "Needs improvement"
                      : rating === 3
                        ? "Good experience"
                        : rating === 4
                          ? "Very good experience"
                          : "Excellent experience"}
              </span>
            </div>

            <div className="feedback-field">
              <label htmlFor="feedback-category">
                What is your feedback about?
              </label>

              <div className="feedback-select-wrapper">
                <i className="bi bi-grid-1x2"></i>

                <select
                  id="feedback-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Overall Experience</option>
                  <option>Event Discovery</option>
                  <option>Event Booking</option>
                  <option>Website Design</option>
                  <option>Customer Support</option>
                  <option>Event Organization</option>
                  <option>Suggestions</option>
                </select>

                <i className="bi bi-chevron-down feedback-select-arrow"></i>
              </div>
            </div>

            <div className="feedback-field">
              <label>How do you feel about Eventora?</label>

              <div className="feedback-experience-options">
                {[
                  {
                    name: "Unhappy",
                    icon: "bi-emoji-frown",
                  },
                  {
                    name: "Neutral",
                    icon: "bi-emoji-neutral",
                  },
                  {
                    name: "Happy",
                    icon: "bi-emoji-smile",
                  },
                  {
                    name: "Excited",
                    icon: "bi-emoji-heart-eyes",
                  },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    className={`feedback-experience-option ${
                      experience === item.name ? "selected" : ""
                    }`}
                    onClick={() => setExperience(item.name)}
                  >
                    <i className={`bi ${item.icon}`}></i>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="feedback-field">
              <label htmlFor="feedback-message">
                Tell us more about your experience
              </label>

              <textarea
                id="feedback-message"
                rows="5"
                placeholder="What did you love? What could we improve? Share your thoughts..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                required
              ></textarea>

              <div className="feedback-character-count">
                <span>Be honest. Be helpful. Be you.</span>
                <span>{message.length}/1000</span>
              </div>
            </div>

            <button type="submit" className="feedback-submit-btn">
              Submit Feedback
              <i className="bi bi-arrow-right"></i>
            </button>

            <p className="feedback-privacy-note">
              <i className="bi bi-shield-check"></i>
              Your feedback is stored in this browser.
            </p>
          </form>

          <aside className="feedback-side-content">
            <div className="feedback-promise-card">
              <div className="feedback-promise-icon">
                <i className="bi bi-heart-fill"></i>
              </div>

              <span className="feedback-side-label">OUR PROMISE</span>

              <h3>Every voice helps us grow.</h3>

              <p>
                We believe great experiences start with listening. Your
                suggestions help us make Eventora better for everyone.
              </p>

              <div className="feedback-promise-list">
                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>We value your honest opinions</span>
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>We look for ways to improve</span>
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Your experience matters to us</span>
                </div>
              </div>
            </div>

            <div className="feedback-tip-card">
              <div className="feedback-tip-icon">
                <i className="bi bi-lightbulb-fill"></i>
              </div>

              <div>
                <h4>A little tip</h4>
                <p>
                  Tell us about a specific feature or experience you enjoyed or
                  would like us to improve.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className="feedback-reviews-section">
        <div className="feedback-reviews-heading">
          <div>
            <span className="feedback-section-label">YOUR THOUGHTS MATTER</span>
            <h2>Previous Feedback</h2>
            <p>Feedback you have submitted from this browser.</p>
          </div>

          <span className="feedback-total-badge">
            {feedbacks.length} {feedbacks.length === 1 ? "Review" : "Reviews"}
          </span>
        </div>

        {feedbacks.length === 0 ? (
          <div className="feedback-empty-state">
            <div className="feedback-empty-icon">
              <i className="bi bi-chat-square-text"></i>
            </div>

            <h3>No feedback submitted yet</h3>

            <p>Your submitted feedback will appear here.</p>
          </div>
        ) : (
          <div className="feedback-reviews-grid">
            {feedbacks.map((item) => (
              <article className="feedback-review-card" key={item.id}>
                <div className="feedback-review-top">
                  <div className="feedback-review-avatar">
                    <i className="bi bi-person-fill"></i>
                  </div>

                  <div className="feedback-review-meta">
                    <strong>{item.name}</strong>
                    <span>{formatDate(item.date)}</span>
                  </div>

                  <button
                    type="button"
                    className="feedback-delete-btn"
                    onClick={() => deleteFeedback(item.id)}
                    aria-label="Delete feedback"
                    title="Delete feedback"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>

                <div className="feedback-review-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`bi ${
                        star <= item.rating ? "bi-star-fill" : "bi-star"
                      }`}
                    ></i>
                  ))}
                </div>
                
                <span className="feedback-review-category">
                  {item.category}
                </span>

                <p className="feedback-review-message">{item.message}</p>

                <div className="feedback-review-experience">
                  <i className="bi bi-emoji-smile"></i>
                  Overall feeling: <strong>{item.experience}</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Feedbacks;
