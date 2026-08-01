import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaPlusCircle } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="container">

      <h2 className="mb-4">Organizer Dashboard</h2>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <FaCalendarAlt size={40} className="text-primary mb-3" />
              <h5>Total Events</h5>
              <h2>12</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <FaUsers size={40} className="text-success mb-3" />
              <h5>Total RSVPs</h5>
              <h2>235</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <FaPlusCircle size={40} className="text-warning mb-3" />
              <Link
                to="/create-event"
                className="btn btn-primary mt-3"
              >
                Create Event
              </Link>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-5">

        <h4>Quick Actions</h4>

        <div className="list-group">

          <Link
            to="/create-event"
            className="list-group-item list-group-item-action"
          >
            Create New Event
          </Link>

          <Link
            to="/manage-events"
            className="list-group-item list-group-item-action"
          >
            Manage Events
          </Link>

          <Link
            to="/analytics"
            className="list-group-item list-group-item-action"
          >
            View Analytics
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;