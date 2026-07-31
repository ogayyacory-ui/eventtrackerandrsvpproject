import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import MyRSVPs from "../pages/MyRSVPs";
import Dashboard from "../pages/Dashboard";
import CreateEvent from "../pages/CreateEvent";
import EditEvent from "../pages/EditEvent";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Public */}

      <Route path="/" element={<Home />} />

      <Route path="/events" element={<Events />} />

      <Route path="/events/:id" element={<EventDetails />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Student */}

      <Route
        path="/my-rsvps"
        element={
          <ProtectedRoute>
            <MyRSVPs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Organizer */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="organizer">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-event"
        element={
          <ProtectedRoute role="organizer">
            <CreateEvent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-event/:id"
        element={
          <ProtectedRoute role="organizer">
            <EditEvent />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;