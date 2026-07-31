import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">

        <img
          src={
            event.image ||
            "https://via.placeholder.com/400x200?text=Campus+Event"
          }
          className="card-img-top"
          alt={event.title}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body">

          <h5 className="card-title">{event.title}</h5>

          <p className="text-muted">
            📅 {event.date}
          </p>

          <p className="text-muted">
            📍 {event.location}
          </p>

          <p className="card-text">
            {event.description?.substring(0, 100)}...
          </p>

        </div>

        <div className="card-footer bg-white">

          <Link
            to={`/events/${event.id}`}
            className="btn btn-primary w-100"
          >
            View Details
          </Link>

        </div>

      </div>
    </div>
  );
}

export default EventCard;