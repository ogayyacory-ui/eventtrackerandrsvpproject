import { Link } from "react-router-dom";

function EventCard({ event, eventimage }) {
  const image =
    eventimage ||
    event.image ||
    "https://placehold.co/400x220?text=No+Image";

  return (
    <article className="event-card">
      <img
        src={image}
        alt={event.title}
        className="event-card-image"
      />

      <div className="event-card-body">
        <h3 className="event-card-title">
          {event.title}
        </h3>

        <p className="event-card-meta">
          {event.date}
        </p>

        <p className="event-card-meta">
           {event.location}
        </p>

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
          View Details
        </Link>
      </div>
    </article>
  );
}

export default EventCard;