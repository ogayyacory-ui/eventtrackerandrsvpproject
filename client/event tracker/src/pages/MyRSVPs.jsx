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
    <div>
      <h2 className="mb-4">My RSVPs</h2>

      <div className="row">
        {events.length === 0 ? (
          <p>You haven't registered for any events yet.</p>
        ) : (
          events.map((rsvp) => (
            <EventCard
              key={rsvp.id}
              event={rsvp.event}
              eventimage={rsvp.event.image}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MyRSVPs;