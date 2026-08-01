import { useEffect, useState } from "react";
import { FaCalendarAlt, FaUsers, FaCheckCircle, FaChartBar } from "react-icons/fa";
import api from "../services/api";
import Loader from "../components/Loader";

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
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Backend endpoint:
      // GET /api/analytics

      const response = await api.get("/analytics");

      setAnalytics(response.data);

    } catch (error) {
      console.error("Analytics Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container">

      <h2 className="mb-4">
        Event Analytics Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3 mb-4">
          <div className="card shadow text-center">
            <div className="card-body">

              <FaCalendarAlt
                size={45}
                className="text-primary mb-3"
              />

              <h5>Total Events</h5>

              <h2>{analytics.totalEvents}</h2>

            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow text-center">
            <div className="card-body">

              <FaUsers
                size={45}
                className="text-success mb-3"
              />

              <h5>Total RSVPs</h5>

              <h2>{analytics.totalRSVPs}</h2>

            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow text-center">
            <div className="card-body">

              <FaChartBar
                size={45}
                className="text-warning mb-3"
              />

              <h5>Upcoming Events</h5>

              <h2>{analytics.upcomingEvents}</h2>

            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow text-center">
            <div className="card-body">

              <FaCheckCircle
                size={45}
                className="text-danger mb-3"
              />

              <h5>Completed Events</h5>

              <h2>{analytics.completedEvents}</h2>

            </div>
          </div>
        </div>

      </div>

      <div className="card shadow mt-4">

        <div className="card-header">
          <h4>Recent Events</h4>
        </div>

        <div className="card-body">

          {analytics.recentEvents.length === 0 ? (

            <p>No events available.</p>

          ) : (

            <table className="table table-hover">

              <thead>

                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>RSVPs</th>
                </tr>

              </thead>

              <tbody>

                {analytics.recentEvents.map((event) => (

                  <tr key={event.id}>

                    <td>{event.title}</td>

                    <td>{event.date}</td>

                    <td>{event.location}</td>

                    <td>{event.attendees}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}

export default Analytics;