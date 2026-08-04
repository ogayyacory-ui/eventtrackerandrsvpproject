import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import EventCard from "../components/EventCard";
import EventFilter from "../components/EventFilter";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { getEvents } from "../services/eventService";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getEvents({ page, per_page: 6, search, category })
      .then((data) => {
        setEvents(data.items || []);
        setTotalPages(data.total_pages || 1);
        setError("");
      })
      .catch((err) => setError(err.message || "Unable to load events."))
      .finally(() => setLoading(false));
  }, [page, search, category]);

  if (loading) return <Loader />;

  return (
    <main className="events-page">
      <section className="events-hero">
        <div className="events-hero-content">
          <p className="section-kicker">Find your next experience</p>
          <h1>Upcoming events</h1>
          <p>Explore the people, ideas, and moments happening across your campus.</p>
          <div className="events-search-panel">
            <SearchBar value={search} onChange={(value) => { setSearch(value); setPage(1); }} />
            <EventFilter category={category} setCategory={(value) => { setCategory(value); setPage(1); }} />
          </div>
        </div>
      </section>
      <section className="events-content">
        <div className="events-heading">
          <div><p className="section-kicker">Make plans</p><h2>Explore what’s on</h2></div>
          <span>{events.length} event{events.length === 1 ? "" : "s"} found</span>
        </div>

      {error && <p className="events-error" role="alert">{error}</p>}

      {!error && events.length === 0 ? (
        <div className="events-empty"><h3>No events available yet.</h3><p>Try another search or check back soon for new campus experiences.</p></div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      )}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </section>
    </main>
  );
}

export default Events;
