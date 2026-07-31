import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import RSVPButton from "../components/RSVPButton";
import { getEvent } from "../services/eventService";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    try {
      const data = await getEvent(id);
      setEvent(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

        <p><strong>Date:</strong> {event.date}</p>

        <p><strong>Time:</strong> {event.time}</p>

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