import { Link } from "react-router-dom";
import { ui } from "../styles/ui";

function EventCard({ event }) {
  return (
    <article style={{ ...ui.card, overflow: "hidden", display: "flex", flexDirection: "column" }}>

        <img
          src={
            event.image ||
            "https://via.placeholder.com/400x200?text=Campus+Event"
          }
          alt={event.title}
          style={{ width: "100%", height: 200, objectFit: "cover", background: "#dfe9ee" }}
        />

        <div style={{ padding: "20px 20px 12px", flex: 1 }}>
          <h3 style={{ margin: "0 0 13px", color: "#102a43", fontSize: "1.13rem" }}>{event.title}</h3>
          <p style={{ ...ui.muted, margin: "0 0 6px", fontSize: ".9rem" }}>📅 {event.date}</p>
          <p style={{ ...ui.muted, margin: "0 0 13px", fontSize: ".9rem" }}>📍 {event.location}</p>
          <p style={{ ...ui.muted, margin: 0, fontSize: ".93rem" }}>{event.description?.substring(0, 100)}{event.description?.length > 100 ? "…" : ""}</p>
        </div>
        <div style={{ padding: "8px 20px 20px" }}>
          <Link to={`/events/${event.id}`} style={{ ...ui.primaryButton, width: "100%" }}>View details</Link>
        </div>
    </article>
  );
}

export default EventCard;
