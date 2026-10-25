import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/Sidebar.css";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      title: "MAIN MENU",
      items: [
        {
          name: "Dashboard",
          icon: "bi-grid-1x2",
          path: "/user-dashboard",
        },
        {
          name: "Explore Events",
          icon: "bi-compass",
          path: "/user-dashboard/explore-events",
        },
        {
          name: "Calendar",
          icon: "bi-calendar3",
          path: "/user-dashboard/calendar",
        },
        {
          name: "Registrations",
          icon: "bi-clipboard-check",
          path: "/user-dashboard/registrations",
        },
        {
          name: "My Bookings",
          icon: "bi-calendar-check",
          path: "/user-dashboard/my-bookings",
        },
        {
          name: "My Tickets",
          icon: "bi-ticket-perforated",
          path: "/user-dashboard/my-tickets",
        },
        {
          name: "Gallery",
          icon: "bi-images",
          path: "/user-dashboard/gallery",
        },
        {
          name: "Wishlist",
          icon: "bi-heart",
          path: "/user-dashboard/wishlist",
        },
      ],
    },
    {
      title: "MORE",
      items: [
        {
          name: "Feedback",
          icon: "bi-chat-square-text",
          path: "/user-dashboard/feedback",
        },
      ],
    },
  ];

  const handleLogout = () => {
    // Connect this button to your authentication system.
    alert("Logout functionality needs to be connected.");
    closeMobileSidebar();
  };

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* MOBILE SIDEBAR TOGGLE */}
      <button
        type="button"
        className="eventora-sidebar-mobile-toggle"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
        aria-expanded={mobileOpen}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <button
          type="button"
          className="eventora-sidebar-overlay"
          onClick={closeMobileSidebar}
          aria-label="Close sidebar"
        ></button>
      )}

      {/* SIDEBAR */}
      <aside
        className={`eventora-sidebar ${
          collapsed ? "sidebar-collapsed" : ""
        } ${mobileOpen ? "sidebar-mobile-open" : ""}`}
      >
        {/* SIDEBAR HEADER */}
        <div className="eventora-sidebar-header">
          <h5 className="eventora-sidebar-heading">{!collapsed && "Menu"}</h5>

          {/* DESKTOP COLLAPSE BUTTON */}
          <button
            type="button"
            className="eventora-sidebar-collapse-btn"
            onClick={() => setCollapsed((previous) => !previous)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <i
              className={`bi ${
                collapsed ? "bi-chevron-right" : "bi-chevron-left"
              }`}
            ></i>
          </button>

          {/* MOBILE CLOSE BUTTON */}
          <button
            type="button"
            className="eventora-sidebar-close-btn"
            onClick={closeMobileSidebar}
            aria-label="Close sidebar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* SIDEBAR NAVIGATION */}
        <nav className="eventora-sidebar-navigation">
          {menuItems.map((section) => (
            <div className="eventora-sidebar-section" key={section.title}>
              {!collapsed && (
                <p className="eventora-sidebar-section-title">
                  {section.title}
                </p>
              )}

              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/user-dashboard"}
                  title={collapsed ? item.name : undefined}
                  className={({ isActive }) =>
                    `eventora-sidebar-link ${isActive ? "active" : ""}`
                  }
                  onClick={closeMobileSidebar}
                >
                  <span className="eventora-sidebar-link-icon">
                    <i className={`bi ${item.icon}`}></i>
                  </span>

                  <span className="eventora-sidebar-link-name">
                    {item.name}
                  </span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className="eventora-sidebar-footer">
          <button
            type="button"
            className="eventora-sidebar-link eventora-sidebar-logout"
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
          >
            <span className="eventora-sidebar-link-icon">
              <i className="bi bi-box-arrow-right"></i>
            </span>

            <span className="eventora-sidebar-link-name">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
