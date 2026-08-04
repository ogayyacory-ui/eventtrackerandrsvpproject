import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, deleteEvent } from "../services/eventService";
import Loader from "../components/Loader";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data.items || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this event?");

    if (!confirmed) return;

    try {
      await deleteEvent(id);
      loadEvents();
    } catch {
      alert("Unable to delete event.");
    }
  };

  if (loading) return <Loader />;

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h1
          style={{
            color: "#1e293b",
            margin: 0,
          }}
        >
          Manage Events
        </h1>

        <Link
          to="/create-event"
          style={{
            background: "#2563eb",
            color: "#fff",
            textDecoration: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          + New Event
        </Link>
      </div>

      {/* Empty State */}
      {events.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <p
            style={{
              color: "#64748b",
              margin: 0,
            }}
          >
            No events available.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: "0 0 8px",
                    color: "#1e293b",
                  }}
                >
                  {event.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                  }}
                >
                  {event.date} &nbsp; | &nbsp;  {event.location}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Link
                  to={`/edit-event/${event.id}`}
                  style={{
                    background: "#f59e0b",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(event.id)}
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ManageEvents;
