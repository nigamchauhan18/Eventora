import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../../assets/AddEvent.css";

const initialFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  endTime: "",
  location: "",
  venue: "",
  address: "",
  price: "",
  currency: "INR",
  image: "",
  shortDescription: "",
  description: "",
  organizerName: "",
  organizerEmail: "",
  organizerPhone: "",
  duration: "",
  capacity: "",
  availableTickets: "",
  highlightsText: "",
  facilitiesText: "",
  ageLimit: "",
  ticketTypesText: "",
  bookingOpen: true,
  cancellationPolicy: "",
  tagsText: "",
};

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const convertToArray = (value) => {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const convertTicketTypes = (value) => {
    return value
      .split("\n")
      .map((line) => {
        const [name, price] = line.split("|");

        return {
          name: name?.trim(),
          price: Number(price?.trim()),
        };
      })
      .filter(
        (ticket) =>
          ticket.name && Number.isFinite(ticket.price) && ticket.price >= 0,
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(formData.availableTickets) > Number(formData.capacity)) {
      toast.error("Available tickets cannot exceed total capacity.");
      return;
    }

    const ticketTypes = convertTicketTypes(formData.ticketTypesText);
    if (ticketTypes.length === 0) {
      toast.error("Please add at least one valid ticket type.");
      return;
    }

    const eventData = {
      title: formData.title.trim(),
      category: formData.category,
      date: formData.date,
      time: formData.time,
      endTime: formData.endTime,
      location: formData.location.trim(),
      venue: formData.venue.trim(),
      address: formData.address.trim(),

      price: Number(formData.price),
      currency: formData.currency,

      image: formData.image.trim(),
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim(),

      organizer: {
        name: formData.organizerName.trim(),
        email: formData.organizerEmail.trim(),
        phone: formData.organizerPhone.trim(),
      },

      duration: formData.duration.trim(),
      capacity: Number(formData.capacity),
      availableTickets: Number(formData.availableTickets),

      highlights: convertToArray(formData.highlightsText),
      facilities: convertToArray(formData.facilitiesText),

      ageLimit: formData.ageLimit.trim(),
      ticketTypes,

      bookingOpen: formData.bookingOpen,
      cancellationPolicy: formData.cancellationPolicy.trim(),

      tags: formData.tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      axios.post("http://localhost:8000/events", eventData);
      toast.success("Event added successfully!");
      setFormData(initialFormData);

      setTimeout(() => {
        navigate("/admin-dashboard/events");
      }, 1000);
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Unable to add event. Please check JSON Server.");
    }
  };

  return (
    <div className="admin-add-event-page">
      <div className="add-event-header">
        <div>
          <span className="add-event-eyebrow">
            <i className="bi bi-calendar2-plus"></i>
            EVENT MANAGEMENT
          </span>
          <h2>Add New Event</h2>
          <p>Create and publish a new event by filling in the details below.</p>
        </div>

        <button
          type="button"
          className="add-event-back-btn"
          onClick={() => navigate("/admin-dashboard/events")}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Events
        </button>
      </div>

      <form onSubmit={handleSubmit} className="add-event-form">
        <section className="add-event-card">
          <div className="add-event-card-header">
            <div className="add-event-card-icon">
              <i className="bi bi-info-circle"></i>
            </div>

            <div>
              <h4>Basic Information</h4>
              <p>Enter the main information about your event.</p>
            </div>
          </div>

          <div className="add-event-grid">
            <div className="add-event-field full-width">
              <label>
                Event Title <span>*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter event title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-event-field">
              <label>
                Event Category <span>*</span>
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Music">Music</option>
                <option value="Technology">Technology</option>
                <option value="Art & Culture">Art & Culture</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Sports">Sports</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="add-event-field">
              <label>Age Limit</label>
              <input
                type="text"
                name="ageLimit"
                placeholder="Example: 16+"
                value={formData.ageLimit}
                onChange={handleChange}
              />
            </div>

            <div className="add-event-field">
              <label>
                Event Date <span>*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-event-field">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                placeholder="Example: 5 hours"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            <div className="add-event-field">
              <label>
                Start Time <span>*</span>
              </label>
              <input
                type="text"
                name="time"
                placeholder="Example: 7:00 AM"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-event-field">
              <label>
                End Time <span>*</span>
              </label>
              <input
                type="text"
                name="endTime"
                placeholder="Example: 12:00 PM"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        <section className="add-event-card">
          <div className="add-event-card-header">
            <div className="add-event-card-icon">
              <i className="bi bi-geo-alt"></i>
            </div>

            <div>
              <h4>Location Details</h4>
              <p>Where will your event take place?</p>
            </div>
          </div>

          <div className="add-event-grid">
            <div className="add-event-field">
              <label>
                City / Location <span>*</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Example: Amroha"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-event-field">
              <label>
                Venue <span>*</span>
              </label>
              <input
                type="text"
                name="venue"
                placeholder="Enter venue name"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-event-field full-width">
              <label>Complete Address</label>
              <textarea
                name="address"
                rows="2"
                placeholder="Enter complete event address"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </section>

        <section className="add-event-card">
          <div className="add-event-card-header">
            <div className="add-event-card-icon">
              <i className="bi bi-ticket-perforated"></i>
            </div>

            <div>
              <h4>Ticket Information</h4>
              <p>Set ticket prices, capacity and availability.</p>
            </div>
          </div>

          <div className="add-event-grid">
            <div className="add-event-field">
              <label>
                Base Ticket Price <span>*</span>
              </label>
              <input
                type="number"
                name="price"
                min="0"
                placeholder="Example: 299"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-event-field">
              <label>Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>

            <div className="add-event-field">
              <label>
                Total Capacity <span>*</span>
              </label>
              <input
                type="number"
                name="capacity"
                min="1"
                placeholder="Example: 1000"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-event-field">
              <label>
                Available Tickets <span>*</span>
              </label>
              <input
                type="number"
                name="availableTickets"
                min="0"
                placeholder="Example: 400"
                value={formData.availableTickets}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-event-field full-width">
              <label>
                Ticket Types <span>*</span>
              </label>
              <textarea
                name="ticketTypesText"
                rows="4"
                placeholder={
                  "Enter one ticket per line:\nGeneral Entry | 299\nActivity Pass | 599"
                }
                value={formData.ticketTypesText}
                onChange={handleChange}
                required
              ></textarea>

              <small>
                Format: Ticket Name | Price. Enter each ticket type on a new
                line.
              </small>
            </div>
          </div>
        </section>

        <section className="add-event-card">
          <div className="add-event-card-header">
            <div className="add-event-card-icon">
              <i className="bi bi-card-text"></i>
            </div>

            <div>
              <h4>Event Description</h4>
              <p>Add an image and describe your event.</p>
            </div>
          </div>

          <div className="add-event-grid">
            <div className="add-event-field full-width">
              <label>Event Image URL</label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/event-image.jpg"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            {/* {formData.image && (
              <div className="add-event-image-preview full-width">
                <img
                  src={formData.image}
                  alt="Event preview"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )} */}

            <div className="add-event-field full-width">
              <label>
                Short Description <span>*</span>
              </label>
              <textarea
                name="shortDescription"
                rows="2"
                placeholder="Write a short summary of your event"
                value={formData.shortDescription}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="add-event-field full-width">
              <label>
                Full Description <span>*</span>
              </label>
              <textarea
                name="description"
                rows="5"
                placeholder="Write complete information about your event..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
        </section>

        <section className="add-event-card">
          <div className="add-event-card-header">
            <div className="add-event-card-icon">
              <i className="bi bi-stars"></i>
            </div>

            <div>
              <h4>Highlights & Facilities</h4>
              <p>Tell visitors what they can expect at the event.</p>
            </div>
          </div>

          <div className="add-event-grid">
            <div className="add-event-field">
              <label>Event Highlights</label>
              <textarea
                name="highlightsText"
                rows="5"
                placeholder={
                  "Enter one highlight per line:\nGroup workouts\nFitness demonstrations\nWellness activities"
                }
                value={formData.highlightsText}
                onChange={handleChange}
              ></textarea>

              <small>Enter each highlight on a separate line.</small>
            </div>

            <div className="add-event-field">
              <label>Available Facilities</label>
              <textarea
                name="facilitiesText"
                rows="5"
                placeholder={
                  "Enter one facility per line:\nDrinking water\nFirst aid\nChanging area\nRestrooms"
                }
                value={formData.facilitiesText}
                onChange={handleChange}
              ></textarea>

              <small>Enter each facility on a separate line.</small>
            </div>
          </div>
        </section>

        <section className="add-event-card">
          <div className="add-event-card-header">
            <div className="add-event-card-icon">
              <i className="bi bi-person-badge"></i>
            </div>

            <div>
              <h4>Organizer Information</h4>
              <p>Provide contact information for the event organizer.</p>
            </div>
          </div>

          <div className="add-event-grid">
            <div className="add-event-field">
              <label>
                Organizer Name <span>*</span>
              </label>
              <input
                type="text"
                name="organizerName"
                placeholder="Enter organizer name"
                value={formData.organizerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-event-field">
              <label>
                Organizer Email <span>*</span>
              </label>
              <input
                type="email"
                name="organizerEmail"
                placeholder="organizer@example.com"
                value={formData.organizerEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-event-field">
              <label>Organizer Phone</label>
              <input
                type="tel"
                name="organizerPhone"
                placeholder="+91 90000 10020"
                value={formData.organizerPhone}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <section className="add-event-card">
          <div className="add-event-card-header">
            <div className="add-event-card-icon">
              <i className="bi bi-shield-check"></i>
            </div>

            <div>
              <h4>Booking & Cancellation</h4>
              <p>Configure booking availability and cancellation rules.</p>
            </div>
          </div>

          <div className="add-event-grid">
            <div className="add-event-field full-width">
              <div className="add-event-booking-toggle">
                <div>
                  <label>Booking Status</label>
                  <p>Allow users to book tickets for this event.</p>
                </div>

                <label className="add-event-switch">
                  <input
                    type="checkbox"
                    name="bookingOpen"
                    checked={formData.bookingOpen}
                    onChange={handleChange}
                  />
                  <span className="add-event-slider"></span>
                </label>
              </div>

              <span
                className={`add-event-booking-status ${
                  formData.bookingOpen ? "open" : "closed"
                }`}
              >
                {formData.bookingOpen ? "Booking Open" : "Booking Closed"}
              </span>
            </div>

            <div className="add-event-field full-width">
              <label>Cancellation Policy</label>
              <textarea
                name="cancellationPolicy"
                rows="3"
                placeholder="Enter event cancellation and refund policy..."
                value={formData.cancellationPolicy}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </section>

        <section className="add-event-card">
          <div className="add-event-card-header">
            <div className="add-event-card-icon">
              <i className="bi bi-tags"></i>
            </div>

            <div>
              <h4>Event Tags</h4>
              <p>Add keywords to help users discover your event.</p>
            </div>
          </div>

          <div className="add-event-field">
            <label>Tags</label>
            <input
              type="text"
              name="tagsText"
              placeholder="Fitness, Wellness, Exercise, Healthy Living"
              value={formData.tagsText}
              onChange={handleChange}
            />

            <small>Separate tags using commas.</small>
          </div>
        </section>

        <div className="add-event-form-actions">
          <button
            type="button"
            className="add-event-cancel-btn"
            onClick={() => navigate("/admin-dashboard/events")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="add-event-submit-btn"
          >
            <i className="bi bi-plus-circle"></i> Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
