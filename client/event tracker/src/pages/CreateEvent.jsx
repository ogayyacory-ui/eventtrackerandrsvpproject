import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";

function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    time: "",
    capacity: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(form);
      alert("Event created successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create event");
    }
  };

  return (
    <main className="simple-page">
      <h1>Create Event</h1>

      <form className="event-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label className="wide">
          Description
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} required />
        </label>

        <label>
          Category
          <input name="category" value={form.category} onChange={handleChange} />
        </label>

        <label>
          Venue
          <input name="location" value={form.location} onChange={handleChange} />
        </label>

        <label>
          Date
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>

        <label>
          Time
          <input type="time" name="time" value={form.time} onChange={handleChange} required />
        </label>

        <label>
          Capacity
          <input type="number" name="capacity" value={form.capacity} onChange={handleChange} />
        </label>

        <label>
          Image URL
          <input name="image" value={form.image} onChange={handleChange} />
        </label>

        <div className="wide">
          <button type="submit" className="primary-button">
            Create Event
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateEvent;