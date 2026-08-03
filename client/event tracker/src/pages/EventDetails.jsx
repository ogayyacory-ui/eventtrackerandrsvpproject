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
    return <h3>Event not found.</h3>;
  }

  return (
    <div className="card shadow">

      <img
        src={
          event.image ||
          "https://via.placeholder.com/800x350"
        }
        className="card-img-top"
        alt={event.title}
      />

      <div className="card-body">

        <h2>{event.title}</h2>

        <p>{event.description}</p>

        <hr />

        {(() => {
          const raw = event.event_date || event.eventDate || event.date;
          const d = raw ? new Date(raw) : null;
          return (
            <>
              <p><strong>Date:</strong> {d ? d.toLocaleDateString() : '—'}</p>
              <p><strong>Time:</strong> {d ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</p>
            </>
          );
        })()}

        <p><strong>Venue:</strong> {event.location}</p>

        <p><strong>Category:</strong> {event.category}</p>

        <p><strong>Capacity:</strong> {event.capacity}</p>

        <RSVPButton
          eventId={event.id}
          initialStatus={event.is_registered}
        />

      </div>

    </div>
  );
}

export default EventDetails;
