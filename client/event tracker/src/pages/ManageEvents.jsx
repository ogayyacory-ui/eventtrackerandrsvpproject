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
      setEvents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadEvents, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await deleteEvent(id);
      loadEvents();
    } catch {
      alert("Unable to delete event.");
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="simple-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Manage Events</h1>
        <Link className="primary-button" to="/create-event">New Event</Link>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {events.map((event) => (
          <div key={event.id} className="rsvp-row" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>{event.title}</strong>
              <small style={{ color: '#748481' }}>{event.date} • {event.location}</small>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <Link to={`/edit-event/${event.id}`} className="primary-button" style={{ background: '#ffc107', color: '#172b2a' }}>
                Edit
              </Link>
              <button className="primary-button" style={{ background: '#dc3545' }} onClick={() => handleDelete(event.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ManageEvents;
