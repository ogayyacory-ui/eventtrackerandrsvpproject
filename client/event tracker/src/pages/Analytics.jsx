import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaChartBar,
} from "react-icons/fa";
import Loader from "../components/Loader";
import api from "../services/api";
import formatDate from "../utils/formatDate";

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
        const response = await api.get("/api/analytics");
        setAnalytics(response);
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
    <main className="dashboard-page">
      <div className="dashboard-content">
        <div className="dashboard-title-row">
          <div>
            <p className="section-kicker">Organizer view</p>
            <h1>Event Analytics Dashboard</h1>
          </div>
        </div>

      {/* Statistics */}

        <div className="dashboard-stats">
          <StatCard label="Total Events" value={analytics.totalEvents} icon={<FaCalendarAlt />} />
          <StatCard label="Total RSVPs" value={analytics.totalRSVPs} icon={<FaUsers />} />
          <StatCard label="Upcoming Events" value={analytics.upcomingEvents} icon={<FaChartBar />} />
          <StatCard label="Completed Events" value={analytics.completedEvents} icon={<FaCheckCircle />} />
        </div>

      {/* Recent Events */}

        <div className="highlight-card" style={{ marginTop: 36 }}>
          <h2 style={{ marginBottom: 25 }}>Recent Events</h2>

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
                    <td style={td}>{formatDate(event.event_date)}</td>
                    <td style={td}>{event.location}</td>
                    <td style={td}>{event.attendees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <article className="dashboard-stat">
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
      <i>{icon}</i>
    </article>
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
