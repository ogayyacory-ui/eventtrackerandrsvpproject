import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import EventCard from "../components/EventCard";
import { getEvents } from "../services/eventService";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
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
          textAlign: "center",
          color: "#1e293b",
          marginBottom: "40px",
          fontSize: "2.5rem",
          fontWeight: "700",
        }}
      >
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "50px",
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          }}
        >
          <h3
            style={{
              color: "#64748b",
              margin: 0,
            }}
          >
            No events available.
          </h3>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Events;