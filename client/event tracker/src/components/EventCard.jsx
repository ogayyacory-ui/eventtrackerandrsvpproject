import { Link } from "react-router-dom";

function EventCard({ event, eventimage }) {
  const image =
    eventimage ||
    event.image ||
    "https://placehold.co/400x220?text=No+Image";

  return (
    <article className="event-card">
      <div className="event-card-image-wrap">
        <img src={image} alt={event.title} className="event-card-image" />
        <span className="event-card-category">{event.category || "Campus event"}</span>
      </div>

      <div className="event-card-body">
        <h3 className="event-card-title">
          {event.title}
        </h3>

        <p className="event-card-meta">▣ {formatEventDate(event.event_date || event.eventDate || event.date)}</p>
        <p className="event-card-meta">⌖ {event.location || "Campus venue"}</p>

        <p className="event-card-description">
          {event.description?.length > 120
            ? `${event.description.substring(0, 120)}...`
            : event.description}
        </p>
      </div>

      <div className="event-card-footer">
        <Link
          to={`/events/${event.id}`}
          className="event-card-button"
        >
          RSVP <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

function formatEventDate(value) {
  if (!value) return "Date to be announced";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date to be announced" : date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default EventCard;
