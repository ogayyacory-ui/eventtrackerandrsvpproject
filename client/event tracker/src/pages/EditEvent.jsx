import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, updateEvent } from "../services/eventService";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    time: "",
    capacity: "",
    image: "",
  });

  useEffect(() => {
    const loadEvent = async () => {
      const data = await getEvent(id);
      setEvent(data);
    };

    loadEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(id, event);
      alert("Event updated successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update event");
    }
  };

  return (
    <main className="simple-page">
      <h1>Edit Event</h1>

      <form className="event-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            value={event.title || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label className="wide">
          Description
          <textarea
            name="description"
            rows={4}
            value={event.description || ""}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Venue
          <input
            name="location"
            value={event.location || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={event.date || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Time
          <input
            type="time"
            name="time"
            value={event.time || ""}
            onChange={handleChange}
            required
          />
        </label>

        <div className="wide">
          <button type="submit" className="primary-button">
            Update Event
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditEvent;
