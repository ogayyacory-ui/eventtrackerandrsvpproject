import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import RSVPButton from "../components/RsvpButton";
import { getEvent } from "../services/eventService";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvent(id)
      .then(setEvent)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  if (!event) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.4rem",
          color: "#64748b",
        }}
      >
        Event not found.
      </div>
    );
  }

  const raw = event.event_date || event.eventDate || event.date;
  const eventDate = raw ? new Date(raw) : null;

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 12px 30px rgba(0,0,0,.08)",
        }}
      >
        <img
          src={
            event.image ||
            "https://via.placeholder.com/1000x450"
          }
          alt={event.title}
          style={{
            width: "100%",
            height: "420px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            padding: "35px",
          }}
        >
          <h1
            style={{
              color: "#1e293b",
              marginBottom: "20px",
            }}
          >
            {event.title}
          </h1>

          <p
            style={{
              color: "#475569",
              lineHeight: "1.8",
              marginBottom: "30px",
            }}
          >
            {event.description}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <InfoCard
              label="📅 Date"
              value={
                eventDate
                  ? eventDate.toLocaleDateString()
                  : "—"
              }
            />

            <InfoCard
              label="🕒 Time"
              value={
                eventDate
                  ? eventDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"
              }
            />

            <InfoCard
              label="📍 Venue"
              value={event.location}
            />

            <InfoCard
              label="🏷 Category"
              value={event.category}
            />

            <InfoCard
              label="👥 Capacity"
              value={event.capacity}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RSVPButton
              eventId={event.id}
              initialStatus={event.is_registered}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ label, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "18px",
      }}
    >
      <div
        style={{
          fontWeight: "700",
          marginBottom: "8px",
          color: "#2563eb",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#334155",
        }}
      >
        {value || "—"}
      </div>
    </div>
  );
}

export default EventDetails;