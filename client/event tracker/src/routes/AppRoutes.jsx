import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import MyRSVPs from "../pages/MyRSVPs";
import Dashboard from "../pages/Dashboard";
import CreateEvent from "../pages/CreateEvent";
import EditEvent from "../pages/EditEvent";
import ManageEvents from "../pages/ManageEvents";
import Analytics from "../pages/Analytics";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";

const OrganizerRoute = ({ children }) => (
  <ProtectedRoute role={["organizer", "admin"]}>
    {children}
  </ProtectedRoute>
);

function AppRoutes() {
  return (
    <Routes>

      {/* Public */}

      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-rsvps"
        element={
          <ProtectedRoute>
            <MyRSVPs />
          </ProtectedRoute>
        }
      />

      {/* Organizer */}

      <Route
        path="/dashboard"
        element={
          <OrganizerRoute>
            <Dashboard />
          </OrganizerRoute>
        }
      />

      <Route
        path="/create-event"
        element={
          <OrganizerRoute>
            <CreateEvent />
          </OrganizerRoute>
        }
      />

      <Route
        path="/edit-event/:id"
        element={
          <OrganizerRoute>
            <EditEvent />
          </OrganizerRoute>
        }
      />

      <Route
        path="/manage-events"
        element={
          <OrganizerRoute>
            <ManageEvents />
          </OrganizerRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <OrganizerRoute>
            <Analytics />
          </OrganizerRoute>
        }
      />

      {/* 404 */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;