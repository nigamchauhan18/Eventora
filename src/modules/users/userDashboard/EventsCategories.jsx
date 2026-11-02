import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "../../../assets/EventsCategories.css";

const EventsCategories = () => {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const eventsAPI = () => {
    axios.get("/data/events.json").then((response) => {
      setEvents(response.data);
      setAllEvents(response.data);

      const myCategories = response.data.map((data) => {
        return data.category;
      });
      const uniqueCategories = [...new Set(myCategories)];
      setCategory(uniqueCategories);
    });
  };

  const myCategoryFiltered = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);

    if (selectedValue === "All") {
      setEvents(allEvents);
    } else {
      const eventValue = allEvents.filter((data) => {
        return data.category === selectedValue;
      });
      setEvents(eventValue);
    }
  };

  useEffect(() => {
    eventsAPI();
  }, []);

  const categories = {};
  events.forEach((event) => {
    const categoryName = event.category;

    if (categories[categoryName]) {
      categories[categoryName] = categories[categoryName] + 1;
    } else {
      categories[categoryName] = 1;
    }
  });

  const chartData = Object.keys(categories).map((categoryName) => ({
    category: categoryName,
    total: categories[categoryName],
  }));

  return (
    <div className="events-categories-chart">
      {/* Summary Cards */}
      <div className="events-categories-summary">
        <div className="category-summary-card">
          <div className="category-summary-icon purple-icon">
            <i className="bi bi-grid-fill"></i>
          </div>

          <div>
            <span>Total Categories</span>
            <h3>{category.length}</h3>
          </div>
        </div>

        <div className="category-summary-card">
          <div className="category-summary-icon pink-icon">
            <i className="bi bi-calendar-event-fill"></i>
          </div>

          <div>
            <span>Total Events</span>
            <h3>{events.length}</h3>
          </div>
        </div>

        <div className="category-filter-card">
          <label htmlFor="categoryFilter">
            <i className="bi bi-funnel-fill"></i>
            Filter Categories
          </label>

          <select
            id="categoryFilter"
            className="form-select"
            value={selectedCategory}
            onChange={myCategoryFiltered}
          >
            <option value="All">All Categories</option>

            {category.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Section */}
      <div className="category-chart-card">
        <div className="category-chart-heading">
          <div>
            <h3>Category Overview</h3>
            <p>Events distribution across different categories.</p>
          </div>

          <span className="chart-live-badge">
            <i className="bi bi-graph-up-arrow"></i>
            Live Overview
          </span>
        </div>

        {events.length === 0 ? (
          <div className="category-empty-state">
            <i className="bi bi-calendar-x"></i>
            <h4>No Events Found</h4>
            <p>There are no events available in this category.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 15, right: 15, left: -15, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eeeeF5"
              />

              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#77758a", fontSize: 12 }}
                interval={0}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#77758a", fontSize: 12 }}
              />

              <Tooltip
                cursor={{ fill: "#f5f2ff" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #eee9ff",
                  boxShadow: "0 5px 20px rgba(70, 50, 120, 0.08)",
                }}
              />

              <Bar
                dataKey="total"
                name="Total Events"
                fill="#7952e8"
                radius={[8, 8, 0, 0]}
                barSize={38}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default EventsCategories;
