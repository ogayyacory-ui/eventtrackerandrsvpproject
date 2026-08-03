import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaChartBar,
} from "react-icons/fa";
import Loader from "../components/Loader";
import api from "../services/api";

function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalEvents: 0,
    totalRSVPs: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    recentEvents: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const response = await api.get("/analytics");

        setAnalytics(response.data);
      } catch (error) {
        console.error("Analytics Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) return <Loader />;

  return (
    <main
      style={{
        maxWidth: "1400px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "35px",
          textAlign: "center",
          color: "#1e293b",
        }}
      >
        Event Analytics Dashboard
      </h1>

      {/* Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px",
          marginBottom: "45px",
        }}
      >
        <StatCard
          title="Total Events"
          value={analytics.totalEvents}
          icon={<FaCalendarAlt size={32} />}
          color="#2563eb"
        />

        <StatCard
          title="Total RSVPs"
          value={analytics.totalRSVPs}
          icon={<FaUsers size={32} />}
          color="#16a34a"
        />

        <StatCard
          title="Upcoming Events"
          value={analytics.upcomingEvents}
          icon={<FaChartBar size={32} />}
          color="#f59e0b"
        />

        <StatCard
          title="Completed Events"
          value={analytics.completedEvents}
          icon={<FaCheckCircle size={32} />}
          color="#dc2626"
        />
      </div>

      {/* Recent Events */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            color: "#1e293b",
          }}
        >
          Recent Events
        </h2>

        {analytics.recentEvents.length === 0 ? (
          <p
            style={{
              color: "#64748b",
            }}
          >
            No events available.
          </p>
        ) : (
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                  }}
                >
                  <th style={th}>Title</th>
                  <th style={th}>Date</th>
                  <th style={th}>Venue</th>
                  <th style={th}>RSVPs</th>
                </tr>
              </thead>

              <tbody>
                {analytics.recentEvents.map((event) => (
                  <tr key={event.id}>
                    <td style={td}>{event.title}</td>
                    <td style={td}>{event.date}</td>
                    <td style={td}>{event.location}</td>
                    <td style={td}>{event.attendees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          color,
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: "#64748b",
          marginBottom: "12px",
        }}
      >
        {title}
      </h3>

      <h2
        style={{
          color: "#1e293b",
          margin: 0,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

const th = {
  padding: "15px",
  textAlign: "left",
  borderBottom: "2px solid #e5e7eb",
  color: "#1e293b",
};

const td = {
  padding: "15px",
  borderBottom: "1px solid #e5e7eb",
};

export default Analytics;