
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
  const [notification, setNotification] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEvent(form);
      setNotification({ type: "success", message: "Event created successfully." });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: err.message || "Failed to create event." });
    }
  };

  return (
    <main className="info-page">
      <div style={{ width: "min(900px, calc(100% - 48px))", margin: "40px auto" }}>
        <div className="highlight-card">
          <h1 style={{ textAlign: "center", color: "#1e293b", marginBottom: 10 }}>Create Event</h1>

          <p style={{ textAlign: "center", color: "#64748b", margin: "0 auto 20px", lineHeight: "1.6", maxWidth: 640 }}>
            Fill in the details below to publish your event and let attendees discover it quickly.
          </p>

          {notification.message && (
            <div className={`form-alert ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          <div>
            <label style={styles.label}>Title</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Category</label>

            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={styles.label}>Description</label>

            <textarea
              name="description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <label style={styles.label}>Venue</label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Date</label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Time</label>

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Capacity</label>

            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Image URL</label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={styles.input}
            />
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", marginTop: 8 }}>
            <button type="submit">Create Event</button>
          </div>
          </form>
        </div>
      </div>
    </main>
  );
}

const styles = {
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    padding: "12px 15px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "14px 35px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
  },
};

export default CreateEvent;