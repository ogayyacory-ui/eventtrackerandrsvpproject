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
    <main className="simple-page">
      <h1>Edit Event</h1>

      <form className="event-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={event.title || ""} onChange={handleChange} />
        </label>

        <label className="wide">
          Description
          <textarea name="description" rows={4} value={event.description || ""} onChange={handleChange} />
        </label>

        <label>
          Venue
          <input name="location" value={event.location || ""} onChange={handleChange} />
        </label>

        <label>
          Date
          <input type="date" name="date" value={event.date || ""} onChange={handleChange} />
        </label>

        <label>
          Time
          <input type="time" name="time" value={event.time || ""} onChange={handleChange} />
        </label>

        <div className="wide">
          <button type="submit" className="primary-button">
            Update Event
          </button>
        </div>
      </form>
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