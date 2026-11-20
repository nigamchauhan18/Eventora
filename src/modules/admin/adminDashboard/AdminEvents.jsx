import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../../assets/ManageEvents.css";

const AdminManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalType, setModalType] = useState("");

  const fetchEvents = () => {
    axios.get("http://localhost:8000/events").then((response) => {
      setEvents(response.data);
    });
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const uniqueCategory = events.map((event) => event.category);
  const categories = ["All", ...new Set(uniqueCategory)];

  const filteredEvents = events.filter((event) => {
    const searchValue = search.toLowerCase();
    const matchesSearch =
      event.title?.toLowerCase().includes(searchValue) ||
      event.location?.toLowerCase().includes(searchValue) ||
      event.category?.toLowerCase().includes(searchValue);
    const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter((event) => event.date >= today).length;
  const bookingOpenEvents = events.filter((event) =>
    event.bookingOpen === true,
  ).length;
  const totalCategories = categories.length - 1;

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    endTime: "",
    duration: "",
    ageLimit: "",
    
    location: "",
    venue: "",
    address: "",

    price: "",
    currency: "INR",
    capacity: "",
    availableTickets: "",
    ticketTypesText: "",

    image: "",
    shortDescription: "",
    description: "",

    highlightsText: "",
    facilitiesText: "",
    tagsText: "",

    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",

    bookingOpen: true,
    cancellationPolicy: "",
  });

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const formatPrice = (price, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const viewEvent = (event) => {
    setSelectedEvent(event);
    setModalType("view");
  };

  const editEvent = (event) => {
    setSelectedEvent(event);

    setFormData({
      title: event.title || "",
      category: event.category || "",
      date: event.date || "",
      time: event.time || "",
      endTime: event.endTime || "",
      duration: event.duration || "",
      ageLimit: event.ageLimit || "",
  
      location: event.location || "",
      venue: event.venue || "",
      address: event.address || "",
  
      price: event.price ?? "",
      currency: event.currency || "INR",
      capacity: event.capacity ?? "",
      availableTickets: event.availableTickets ?? "",
  
      ticketTypesText: (event.ticketTypes || [])
        .map((ticket) => `${ticket.name} | ${ticket.price}`)
        .join("\n"),
  
      image: event.image || "",
      shortDescription: event.shortDescription || "",
      description: event.description || "",
  
      highlightsText: (event.highlights || []).join("\n"),
      facilitiesText: (event.facilities || []).join("\n"),
      tagsText: (event.tags || []).join(", "),
  
      organizerName: event.organizer?.name || "",
      organizerEmail: event.organizer?.email || "",
      organizerPhone: event.organizer?.phone || "",

      bookingOpen: event.bookingOpen ?? true,
      cancellationPolicy: event.cancellationPolicy || "",
    });
    setModalType("edit");
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
  
    try {
      const ticketTypes = formData.ticketTypesText.split("\n").map((line) => {
          const [name, price] = line.split("|");
  
          return {
            name: name?.trim(),
            price: Number(price?.trim()),
          };
        }).filter((ticket) => ticket.name && Number.isFinite(ticket.price));
  
      const updatedEvent = {
        ...selectedEvent,
  
        title: formData.title,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        endTime: formData.endTime,
        duration: formData.duration,
        ageLimit: formData.ageLimit,
  
        location: formData.location,
        venue: formData.venue,
        address: formData.address,
  
        price: Number(formData.price),
        currency: formData.currency,
        capacity: Number(formData.capacity),
        availableTickets: Number(formData.availableTickets),
  
        image: formData.image,
        shortDescription: formData.shortDescription,
        description: formData.description,
  
        highlights: formData.highlightsText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
  
        facilities: formData.facilitiesText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
  
        tags: formData.tagsText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
  
        ticketTypes,
  
        organizer: {
          name: formData.organizerName,
          email: formData.organizerEmail,
          phone: formData.organizerPhone,
        },
  
        bookingOpen: formData.bookingOpen,
        cancellationPolicy: formData.cancellationPolicy,
      };
  
      const response = axios.patch(`${"http://localhost:8000/events"}/${selectedEvent.id}`, updatedEvent);
  
      setEvents((prev) => prev.map((event) =>
          event.id === selectedEvent.id ? response.data : event
        )
      );
  
      toast.success("Event updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Unable to update event.");
    }
  };

  const deleteEvent = (event) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${event.title}"?`);
    if (!confirmDelete) return;
   
    axios.delete(`http://localhost:8000/events/${event.id}`).then(() => {
      toast.success("Event deleted successfully!");
      fetchEvents();
    });
  }

  const closeModal = () => {
    setModalType("");
    setSelectedEvent(null);
  };

  return (
    <div className="admin-events-page">
      <div className="admin-events-header">
        <div>
          <span className="admin-events-eyebrow">
            <i className="bi bi-calendar-event"></i>
            EVENT MANAGEMENT
          </span>
          <h2>Manage Events</h2>
          <p>View, edit and manage all events on your Eventora platform.</p>
        </div>
        <button
          className="admin-add-event-btn"
          onClick={() => (window.location.href = "/admin-dashboard/events/add-event")}
        >
          <i className="bi bi-plus-lg"></i>
          Add New Event
        </button>
      </div>

      <div className="admin-event-stats">
        <div className="admin-event-stat-card">
          <div className="admin-event-stat-icon purple">
            <i className="bi bi-calendar2-week"></i>
          </div>

          <div>
            <p>Total Events</p>
            <h3>{events.length}</h3>
            <span>All registered events</span>
          </div>
        </div>

        <div className="admin-event-stat-card">
          <div className="admin-event-stat-icon blue">
            <i className="bi bi-calendar-check"></i>
          </div>

          <div>
            <p>Upcoming Events</p>
            <h3>{upcomingEvents}</h3>
            <span>Scheduled events</span>
          </div>
        </div>

        <div className="admin-event-stat-card">
          <div className="admin-event-stat-icon green">
            <i className="bi bi-ticket-perforated"></i>
          </div>

          <div>
            <p>Booking Open</p>
            <h3>{bookingOpenEvents}</h3>
            <span>Accepting bookings</span>
          </div>
        </div>

        <div className="admin-event-stat-card">
          <div className="admin-event-stat-icon orange">
            <i className="bi bi-grid"></i>
          </div>

          <div>
            <p>Categories</p>
            <h3>{totalCategories}</h3>
            <span>Event categories</span>
          </div>
        </div>
      </div>

      <div className="admin-events-content">
        <div className="admin-events-section-header">
          <div>
            <h4>All Events</h4>
            <p>Manage your event listings and details.</p>
          </div>

          <span className="admin-events-total">
            {filteredEvents.length} Events
          </span>
        </div>

        <div className="admin-events-toolbar">
          <div className="admin-events-search">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search events, location or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="admin-events-filter">
            <i className="bi bi-funnel"></i>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-events-table-wrapper">
          <table className="admin-events-table">
            <thead>
              <tr>
                <th>EVENT DETAILS</th>
                <th>CATEGORY</th>
                <th>DATE & TIME</th>
                <th>LOCATION</th>
                <th>PRICE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="admin-events-message">
                    <i className="bi bi-calendar-x"></i>
                    <h5>No Events Found</h5>
                    <p>Try changing your search or category filter.</p>
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <div className="admin-event-info">
                        <img
                          src={event.image}
                          alt={event.title}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/100x80?text=Event";
                          }}
                        />
                        <div>
                          <h6>{event.title}</h6>
                          <span>#{event.id}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="admin-event-category">
                        {event.category}
                      </span>
                    </td>

                    <td>
                      <div className="admin-event-date">
                        <strong>{formatDate(event.date)}</strong>
                        <span>
                          <i className="bi bi-clock"></i>
                          {event.time}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="admin-event-location">
                        <i className="bi bi-geo-alt"></i>
                        {event.location}
                      </div>
                    </td>

                    <td>
                      <strong className="admin-event-price">
                        {formatPrice(event.price, event.currency)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`admin-event-status ${
                          event.bookingOpen ? "open" : "closed"
                        }`}
                      >
                        <span></span>
                        {event.bookingOpen ? "Booking Open" : "Closed"}
                      </span>
                    </td>

                    <td>
                      <div className="admin-event-actions">
                        <button
                          className="view-action"
                          title="View Event"
                          onClick={() => viewEvent(event)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>

                        <button
                          className="edit-action"
                          title="Edit Event"
                          onClick={() => editEvent(event)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="delete-action"
                          title="Delete Event"
                          onClick={() => deleteEvent(event)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalType === "view" && selectedEvent && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div
            className="admin-event-modal view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <span>EVENT INFORMATION</span>
                <h3>Event Details</h3>
              </div>
      
              <button onClick={closeModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
      
            <div className="admin-view-content">
      
              <div className="admin-view-image-wrapper">
                <img
                  className="admin-view-image"
                  src={
                    selectedEvent.image ||
                    "https://placehold.co/900x400?text=Event"
                  }
                  alt={selectedEvent.title}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/900x400?text=Event";
                  }}
                />
      
                <span
                  className={`admin-event-status ${
                    selectedEvent.bookingOpen ? "open" : "closed"
                  }`}
                >
                  <span></span>
                  {selectedEvent.bookingOpen
                    ? "Booking Open"
                    : "Booking Closed"}
                </span>
              </div>
      
              <div className="admin-view-title-section">
                <div>
                  <span className="admin-event-category">
                    {selectedEvent.category || "Uncategorized"}
                  </span>
      
                  <h3>{selectedEvent.title}</h3>
      
                  <p>{selectedEvent.shortDescription || "No short description available."}</p>
                </div>
      
                <div className="admin-view-event-id">
                  <span>Event ID</span>
                  <strong>#{selectedEvent.id}</strong>
                </div>
              </div>
      
              <div className="admin-view-extra">
                <h5>
                  <i className="bi bi-card-text"></i>
                  About This Event
                </h5>
      
                <p>
                  {selectedEvent.description || "No event description available."}
                </p>
              </div>
      
              <div className="admin-view-extra">
                <h5>
                  <i className="bi bi-info-circle"></i>
                  Event Information
                </h5>
      
                <div className="admin-view-grid">
      
                  <div>
                    <i className="bi bi-calendar3"></i>
                    <span>Event Date</span>
                    <strong>{formatDate(selectedEvent.date)}</strong>
                  </div>
      
                  <div>
                    <i className="bi bi-clock"></i>
                    <span>Event Time</span>
                    <strong>
                      {selectedEvent.time || "N/A"} -{" "}
                      {selectedEvent.endTime || "N/A"}
                    </strong>
                  </div>
      
                  <div>
                    <i className="bi bi-hourglass-split"></i>
                    <span>Duration</span>
                    <strong>{selectedEvent.duration || "N/A"}</strong>
                  </div>
      
                  <div>
                    <i className="bi bi-geo-alt"></i>
                    <span>Location</span>
                    <strong>{selectedEvent.location || "N/A"}</strong>
                  </div>
      
                  <div>
                    <i className="bi bi-building"></i>
                    <span>Venue</span>
                    <strong>{selectedEvent.venue || "N/A"}</strong>
                  </div>
      
                  <div>
                    <i className="bi bi-pin-map"></i>
                    <span>Full Address</span>
                    <strong>{selectedEvent.address || "N/A"}</strong>
                  </div>
      
                  <div>
                    <i className="bi bi-person-check"></i>
                    <span>Age Limit</span>
                    <strong>{selectedEvent.ageLimit || "N/A"}</strong>
                  </div>
      
                  <div>
                    <i className="bi bi-people"></i>
                    <span>Total Capacity</span>
                    <strong>{selectedEvent.capacity ?? "N/A"}</strong>
                  </div>
      
                </div>
              </div>
      
              <div className="admin-view-extra">
                <h5>
                  <i className="bi bi-ticket-perforated"></i>
                  Ticket Information
                </h5>
      
                <div className="admin-view-grid">
      
                  <div>
                    <i className="bi bi-currency-rupee"></i>
                    <span>Starting Price</span>
                    <strong>
                      {formatPrice(
                        selectedEvent.price,
                        selectedEvent.currency
                      )}
                    </strong>
                  </div>
      
                  <div>
                    <i className="bi bi-ticket"></i>
                    <span>Available Tickets</span>
                    <strong>
                      {selectedEvent.availableTickets ?? "N/A"}
                    </strong>
                  </div>
      
                  <div>
                    <i className="bi bi-collection"></i>
                    <span>Total Capacity</span>
                    <strong>{selectedEvent.capacity ?? "N/A"}</strong>
                  </div>
      
                  <div>
                    <i className="bi bi-calendar-check"></i>
                    <span>Booking Status</span>
                    <strong>
                      {selectedEvent.bookingOpen
                        ? "Accepting Bookings"
                        : "Bookings Closed"}
                    </strong>
                  </div>
      
                </div>
      
                <h6 className="admin-view-subheading">Available Ticket Types</h6>
      
                <div className="admin-view-ticket-list">
                  {selectedEvent.ticketTypes?.length ? (
                    selectedEvent.ticketTypes.map((ticket, index) => (
                      <div className="admin-view-ticket-card" key={index}>
                        <div>
                          <i className="bi bi-ticket-perforated"></i>
      
                          <div>
                            <strong>{ticket.name}</strong>
                            <span>Ticket Type</span>
                          </div>
                        </div>
      
                        <strong>
                          {formatPrice(
                            ticket.price,
                            selectedEvent.currency
                          )}
                        </strong>
                      </div>
                    ))
                  ) : (
                    <p>No ticket types available.</p>
                  )}
                </div>
              </div>
      
              <div className="admin-view-extra">
                <h5>
                  <i className="bi bi-stars"></i>
                  Event Highlights
                </h5>
                <div className="admin-view-tags">
                  {selectedEvent.highlights?.length ? (
                    selectedEvent.highlights.map((item, index) => (
                      <span key={index}>
                        <i className="bi bi-check-circle-fill"></i>
                        {item}
                      </span>
                    ))
                  ) : (
                    <p>No highlights available.</p>
                  )}
                </div>
              </div>
      
              <div className="admin-view-extra">
                <h5>
                  <i className="bi bi-building-check"></i>
                  Available Facilities
                </h5>
                <div className="admin-view-tags">
                  {selectedEvent.facilities?.length ? (
                    selectedEvent.facilities.map((item, index) => (
                      <span key={index}>
                        <i className="bi bi-check2-circle"></i>
                        {item}
                      </span>
                    ))
                  ) : (
                    <p>No facilities information available.</p>
                  )}
                </div>
              </div>
      
              <div className="admin-view-extra">
                <h5>
                  <i className="bi bi-person-badge"></i>
                  Organizer Information
                </h5>
      
                <div className="admin-view-grid">
      
                  <div>
                    <i className="bi bi-person"></i>
                    <span>Organizer Name</span>
                    <strong>
                      {selectedEvent.organizer?.name || "N/A"}
                    </strong>
                  </div>
      
                  <div>
                    <i className="bi bi-envelope"></i>
                    <span>Email Address</span>
                    <strong>
                      {selectedEvent.organizer?.email || "N/A"}
                    </strong>
                  </div>
      
                  <div>
                    <i className="bi bi-telephone"></i>
                    <span>Contact Number</span>
                    <strong>
                      {selectedEvent.organizer?.phone || "N/A"}
                    </strong>
                  </div>
      
                </div>
              </div>
      
              <div className="admin-view-extra">
                <h5>
                  <i className="bi bi-tags"></i>
                  Event Tags
                </h5>
                <div className="admin-view-tags">
                  {selectedEvent.tags?.length ? (
                    selectedEvent.tags.map((tag, index) => (
                      <span key={index}>
                        <i className="bi bi-hash"></i>
                        {tag}
                      </span>
                    ))
                  ) : (
                    <p>No tags available.</p>
                  )}
                </div>
              </div>
      
              <div className="admin-view-extra">
                <h5>
                  <i className="bi bi-shield-check"></i>
                  Cancellation Policy
                </h5>
      
                <p>
                  {selectedEvent.cancellationPolicy ||
                    "No cancellation policy provided."}
                </p>
              </div>
      
            </div>
      
            <div className="admin-modal-footer">
              <button
                className="admin-modal-close-btn"
                onClick={closeModal}
              >
                Close
              </button>
      
              <button
                className="admin-modal-edit-btn"
                onClick={() => editEvent(selectedEvent)}
              >
                <i className="bi bi-pencil-square"></i>
                Edit Event
              </button>
            </div>
      
          </div>
        </div>
      )}

      {modalType === "edit" && selectedEvent && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div
            className="admin-event-modal edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <span>EVENT MANAGEMENT</span>
                <h3>Edit Event</h3>
              </div>
      
              <button type="button" onClick={closeModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
      
            <form onSubmit={handleUpdate}>
              <div className="admin-edit-form">
      
                <div className="admin-edit-section full">
                  <h5>
                    <i className="bi bi-info-circle"></i>
                    Basic Information
                  </h5>
                  <p>Update the basic details of your event.</p>
                </div>
      
                <div className="admin-edit-field full">
                  <label>Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    required
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                    required
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>Event Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>Start Time</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="Example: 7:00 AM"
                    required
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>End Time</label>
                  <input
                    type="text"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    placeholder="Example: 12:00 PM"
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Example: 5 hours"
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>Age Limit</label>
                  <input
                    type="text"
                    name="ageLimit"
                    value={formData.ageLimit}
                    onChange={handleChange}
                    placeholder="Example: 16+"
                  />
                </div>
      
                <div className="admin-edit-section full">
                  <h5>
                    <i className="bi bi-geo-alt"></i>
                    Location Information
                  </h5>
                  <p>Update the event location and venue details.</p>
                </div>
      
                <div className="admin-edit-field">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter city or location"
                    required
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>Venue</label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="Enter venue name"
                  />
                </div>
      
                <div className="admin-edit-field full">
                  <label>Full Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete event address"
                  />
                </div>
      
                <div className="admin-edit-section full">
                  <h5>
                    <i className="bi bi-ticket-perforated"></i>
                    Ticket Information
                  </h5>
                  <p>Manage ticket prices, availability and capacity.</p>
                </div>
      
                <div className="admin-edit-field">
                  <label>Ticket Price</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter ticket price"
                    required
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
      
                <div className="admin-edit-field">
                  <label>Total Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    min="0"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Enter total capacity"
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>Available Tickets</label>
                  <input
                    type="number"
                    name="availableTickets"
                    min="0"
                    value={formData.availableTickets}
                    onChange={handleChange}
                    placeholder="Enter available tickets"
                  />
                </div>
      
                <div className="admin-edit-field full">
                  <label>Ticket Types</label>
                  <textarea
                    name="ticketTypesText"
                    rows="4"
                    value={formData.ticketTypesText}
                    onChange={handleChange}
                    placeholder={"General Entry | 299\nActivity Pass | 599"}
                  />
                  <small>
                    Enter one ticket per line using: Ticket Name | Price
                  </small>
                </div>
      
                <div className="admin-edit-section full">
                  <h5>
                    <i className="bi bi-card-text"></i>
                    Event Description
                  </h5>
                  <p>Update your event image and descriptions.</p>
                </div>
      
                <div className="admin-edit-field full">
                  <label>Event Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter event image URL"
                  />
                </div>
      
                <div className="admin-edit-field full">
                  <label>Short Description</label>
                  <textarea
                    name="shortDescription"
                    rows="2"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Enter a short event description"
                  />
                </div>
      
                <div className="admin-edit-field full">
                  <label>Full Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter complete event description"
                  />
                </div>
      
                <div className="admin-edit-section full">
                  <h5>
                    <i className="bi bi-stars"></i>
                    Highlights & Facilities
                  </h5>
                  <p>Manage event highlights and available facilities.</p>
                </div>
      
                <div className="admin-edit-field full">
                  <label>Event Highlights</label>
                  <textarea
                    name="highlightsText"
                    rows="4"
                    value={formData.highlightsText}
                    onChange={handleChange}
                    placeholder={"Group workouts\nFitness demonstrations\nWellness activities"}
                  />
                  <small>Enter each highlight on a new line.</small>
                </div>
      
                <div className="admin-edit-field full">
                  <label>Available Facilities</label>
                  <textarea
                    name="facilitiesText"
                    rows="4"
                    value={formData.facilitiesText}
                    onChange={handleChange}
                    placeholder={"Drinking water\nFirst aid\nRestrooms"}
                  />
                  <small>Enter each facility on a new line.</small>
                </div>
      
                <div className="admin-edit-field full">
                  <label>Event Tags</label>
                  <input
                    type="text"
                    name="tagsText"
                    value={formData.tagsText}
                    onChange={handleChange}
                    placeholder="Fitness, Wellness, Exercise, Healthy Living"
                  />
                  <small>Separate tags using commas.</small>
                </div>
      
                <div className="admin-edit-section full">
                  <h5>
                    <i className="bi bi-person-badge"></i>
                    Organizer Information
                  </h5>
                  <p>Update the event organizer's contact details.</p>
                </div>
      
                <div className="admin-edit-field full">
                  <label>Organizer Name</label>
                  <input
                    type="text"
                    name="organizerName"
                    value={formData.organizerName}
                    onChange={handleChange}
                    placeholder="Enter organizer name"
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>Organizer Email</label>
                  <input
                    type="email"
                    name="organizerEmail"
                    value={formData.organizerEmail}
                    onChange={handleChange}
                    placeholder="organizer@example.com"
                  />
                </div>
      
                <div className="admin-edit-field">
                  <label>Organizer Phone</label>
                  <input
                    type="text"
                    name="organizerPhone"
                    value={formData.organizerPhone}
                    onChange={handleChange}
                    placeholder="+91 90000 10000"
                  />
                </div>
      
                <div className="admin-edit-section full">
                  <h5>
                    <i className="bi bi-shield-check"></i>
                    Booking & Cancellation
                  </h5>
                  <p>Manage booking availability and cancellation policy.</p>
                </div>
      
                <div className="admin-edit-field full">
                  <label className="admin-booking-toggle">
                    <input
                      type="checkbox"
                      name="bookingOpen"
                      checked={formData.bookingOpen}
                      onChange={handleChange}
                    />
                    <span className="admin-toggle-slider"></span>
                    Booking is Open
                  </label>
                </div>
      
                <div className="admin-edit-field full">
                  <label>Cancellation Policy</label>
                  <textarea
                    name="cancellationPolicy"
                    rows="3"
                    value={formData.cancellationPolicy}
                    onChange={handleChange}
                    placeholder="Enter cancellation policy"
                  />
                </div>
      
              </div>
      
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-modal-close-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
      
                <button type="submit" className="admin-modal-edit-btn">
                  <i className="bi bi-check2-circle"></i>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};     
    
export default AdminManageEvents;
