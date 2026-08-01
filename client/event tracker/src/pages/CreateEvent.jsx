import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";

function CreateEvent() {

  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    time: "",
    capacity: "",
    image: ""
  });

  const handleChange = (e) => {

    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createEvent(event);

      alert("Event created successfully!");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Failed to create event.");

    }

  };

  return (

    <div className="container">

      <div className="card shadow">

        <div className="card-body">

          <h2>Create Event</h2>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              placeholder="Event Title"
              name="title"
              onChange={handleChange}
              required
            />

            <textarea
              className="form-control mb-3"
              placeholder="Description"
              rows="4"
              name="description"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Category"
              name="category"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Venue"
              name="location"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              type="date"
              name="date"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              type="time"
              name="time"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              type="number"
              placeholder="Capacity"
              name="capacity"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-4"
              placeholder="Image URL"
              name="image"
              onChange={handleChange}
            />

            <button className="btn btn-success w-100">
              Create Event
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default CreateEvent;