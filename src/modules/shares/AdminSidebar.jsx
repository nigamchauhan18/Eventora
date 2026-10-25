import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../assets/AdminSidebar.css";

function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "MAIN MENU",
      items: [
        {
          name: "Dashboard",
          icon: "bi-grid-1x2",
          path: "/admin-dashboard",
        },
        {
          name: "Manage Events",
          icon: "bi-calendar-event",
          path: "/admin-dashboard/events",
        },
        {
          name: "Categories",
          icon: "bi-tags",
          path: "/admin-dashboard/categories",
        },
        {
          name: "Manage Users",
          icon: "bi-people",
          path: "/admin-dashboard/users",
        },
        {
          name: "Registrations",
          icon: "bi-clipboard-check",
          path: "/admin-dashboard/registrations",
        },
        {
          name: "Bookings",
          icon: "bi-calendar-check",
          path: "/admin-dashboard/bookings",
        },
        {
          name: "Payments",
          icon: "bi-credit-card",
          path: "/admin-dashboard/payments",
        },
      ],
    },
    {
      title: "ANALYTICS",
      items: [
        {
          name: "Reports & Analytics",
          icon: "bi-bar-chart",
          path: "/admin-dashboard/reports",
        },
        {
          name: "Notifications",
          icon: "bi-bell",
          path: "/admin-dashboard/notifications",
        },
      ],
    },
  ];

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to log out?"
    );

    if (confirmLogout) {
      closeMobileSidebar();
      navigate("/admin-login");
    }
  };

  return (
    <>
      {/* MOBILE SIDEBAR TOGGLE */}
      <button
        type="button"
        className="admin-sidebar-mobile-toggle"
        onClick={() => setMobileOpen(true)}
        aria-label="Open admin sidebar"
        aria-expanded={mobileOpen}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={closeMobileSidebar}
          aria-label="Close admin sidebar"
        />
      )}

      {/* ADMIN SIDEBAR */}
      <aside
        className={`admin-sidebar ${
          collapsed ? "admin-sidebar-collapsed" : ""
        } ${mobileOpen ? "admin-sidebar-mobile-open" : ""}`}
      >
        {/* SIDEBAR HEADER */}
        <div className="admin-sidebar-header">
          <h5 className="admin-sidebar-heading">
            {!collapsed && "Admin Menu"}
          </h5>

          {/* DESKTOP COLLAPSE BUTTON */}
          <button
            type="button"
            className="admin-sidebar-collapse-btn"
            onClick={() => setCollapsed((previous) => !previous)}
            aria-label={
              collapsed ? "Expand sidebar" : "Collapse sidebar"
            }
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
            className="admin-sidebar-close-btn"
            onClick={closeMobileSidebar}
            aria-label="Close admin sidebar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* SIDEBAR NAVIGATION */}
        <nav className="admin-sidebar-navigation">
          {menuItems.map((section) => (
            <div
              className="admin-sidebar-section"
              key={section.title}
            >
              {!collapsed && (
                <p className="admin-sidebar-section-title">
                  {section.title}
                </p>
              )}

              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin-dashboard"}
                  title={collapsed ? item.name : undefined}
                  className={({ isActive }) =>
                    `admin-sidebar-link ${
                      isActive ? "admin-sidebar-link-active" : ""
                    }`
                  }
                  onClick={closeMobileSidebar}
                >
                  <span className="admin-sidebar-link-icon">
                    <i className={`bi ${item.icon}`}></i>
                  </span>

                  {!collapsed && (
                    <span className="admin-sidebar-link-name">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className="admin-sidebar-footer">
          <button
            type="button"
            className="admin-sidebar-link admin-sidebar-logout"
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
          >
            <span className="admin-sidebar-link-icon">
              <i className="bi bi-box-arrow-right"></i>
            </span>

            {!collapsed && (
              <span className="admin-sidebar-link-name">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
