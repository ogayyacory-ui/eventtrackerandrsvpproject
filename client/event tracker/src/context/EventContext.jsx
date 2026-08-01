import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import { EventContext } from "./eventContext";

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = () => getEvents()
    .then(setEvents)
    .catch(console.error)
    .finally(() => setLoading(false));

  useEffect(() => {
    const timer = setTimeout(fetchEvents, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        fetchEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
