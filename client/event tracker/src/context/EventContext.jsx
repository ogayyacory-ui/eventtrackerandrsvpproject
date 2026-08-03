import { createContext, useEffect, useState } from "react";
import { getEvents } from "../services/eventService";

// eslint-disable-next-line react-refresh/only-export-components
export const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);

    try {
      const data = await getEvents();
      setEvents(data.items || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data.items || []))
      .catch((error) => console.error("Error fetching events:", error))
      .finally(() => setLoading(false));
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
