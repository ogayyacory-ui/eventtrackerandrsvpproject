import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import { getMyRSVPs } from "../services/rsvpService";

function MyRSVPs() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRSVPs();
  }, []);

  const loadRSVPs = async () => {
    try {
      const data = await getMyRSVPs();
      setEvents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>

      <h2 className="mb-4">My RSVPs</h2>

      <div className="row">

        {events.length === 0 ? (
          <p>You haven't registered for any events yet.</p>
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

export default MyRSVPs;