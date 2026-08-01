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
    <div>

      <h2 className="mb-4">Upcoming Events</h2>

      <div className="row">

        {events.length === 0 ? (
          <h4>No events available.</h4>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default Events;
