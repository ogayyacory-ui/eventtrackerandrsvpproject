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
      try {
        const data = await getEvent(id);
        setEvent(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEvent(id, event);
      alert("Event updated successfully.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update event.");
    }
  };

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "35px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1e293b",
            marginBottom: "35px",
          }}
        >
          Edit Event
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          <div>
            <label style={styles.label}>Title</label>

            <input
              type="text"
              name="title"
              value={event.title || ""}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Venue</label>

            <input
              type="text"
              name="location"
              value={event.location || ""}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Date</label>

            <input
              type="date"
              name="date"
              value={event.date || ""}
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
              value={event.time || ""}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div
            style={{
              gridColumn: "1 / -1",
            }}
          >
            <label style={styles.label}>Description</label>

            <textarea
              name="description"
              rows={5}
              value={event.description || ""}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <button
              type="submit"
              style={styles.button}
            >
              Update Event
            </button>
          </div>
        </form>
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
    color: "#fff",
    border: "none",
    padding: "14px 35px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
  },
};

export default EditEvent;