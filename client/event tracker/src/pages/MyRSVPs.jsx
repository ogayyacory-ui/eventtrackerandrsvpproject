import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import { getMyRSVPs } from "../services/rsvpService";

function MyRSVPs() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyRSVPs()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          color: "#1e293b",
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        My RSVPs
      </h2>

      {events.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              color: "#64748b",
              fontSize: "1.1rem",
            }}
          >
            You haven't registered for any events yet.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px",
          }}
        >
          {events.map((rsvp) => (
            <EventCard
              key={rsvp.id}
              event={rsvp.event}
              eventImage={rsvp.event?.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRSVPs;