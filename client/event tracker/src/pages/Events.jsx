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
    <main
      style={{
        maxWidth: "1400px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e293b",
          marginBottom: "40px",
          fontSize: "2.5rem",
          fontWeight: "700",
        }}
      >
        Upcoming Events
      </h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={(value) => { setSearch(value); setPage(1); }} />
        <EventFilter category={category} setCategory={(value) => { setCategory(value); setPage(1); }} />
      </div>

      {error && <p role="alert" style={{ color: "#b91c1c" }}>{error}</p>}

      {!error && events.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "50px",
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          }}
        >
          <h3
            style={{
              color: "#64748b",
              margin: 0,
            }}
          >
            No events available.
          </h3>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      )}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </main>
  );
}

export default Events;
