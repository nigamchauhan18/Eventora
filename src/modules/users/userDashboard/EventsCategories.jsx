import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "../../../assets/EventsCategories.css";

const EventsCategories = () => {
  const [events, setEvents] = useState([]);

  const eventsAPI = () => {
    axios.get("/data/events.json").then((response) => {
      setEvents(response.data);
    });
  };

  useEffect(() => {
    eventsAPI();
  }, []);

  const categories = {};
  
  events.forEach((event) => {
    const category = event.category;
    if (categories[category]) {
      categories[category] = categories[category] + 1;
    } else {
      categories[category] = 1;
    }
  });

  const categoryData = Object.keys(categories).map((category) => ({
    name: category,
    total: categories[category],
  }));

  return (
    <div className="events-categories-chart">
      <div className="events-categories-summary">
        <div>
          <span>Total Categories</span>
          <h3>{categoryData.length}</h3>
        </div>

        <div>
          <span>Total Events</span>
          <h3>{events.length}</h3>
        </div>
      </div>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={categoryData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="total" fill="#7952e8" radius={[7, 7, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default EventsCategories;
