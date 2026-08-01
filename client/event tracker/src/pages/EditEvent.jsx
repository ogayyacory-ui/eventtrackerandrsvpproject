import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, updateEvent } from "../services/eventService";

function EditEvent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({});

  useEffect(() => {

    const loadEvent = async () => {

      const data = await getEvent(id);

      setEvent(data);

    };

    loadEvent();

  }, [id]);

  const handleChange = (e) => {

    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await updateEvent(id, event);

    navigate("/manage-events");

  };

  return (

    <div className="container">

      <div className="card shadow">

        <div className="card-body">

          <h2>Edit Event</h2>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              name="title"
              value={event.title || ""}
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              rows="4"
              name="description"
              value={event.description || ""}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="location"
              value={event.location || ""}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              type="date"
              name="date"
              value={event.date || ""}
              onChange={handleChange}
            />

            <input
              className="form-control mb-4"
              type="time"
              name="time"
              value={event.time || ""}
              onChange={handleChange}
            />

            <button className="btn btn-success w-100">
              Update Event
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default EditEvent;