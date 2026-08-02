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

// Protected Route
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* ===================== PUBLIC ROUTES ===================== */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/events" element={<Events />} />

      <Route path="/events/:id" element={<EventDetails />} />

      {/* ===================== AUTHENTICATED USERS ===================== */}

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

      {/* ===================== ORGANIZER ROUTES ===================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role={["organizer", "admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-event"
        element={
          <ProtectedRoute role={["organizer", "admin"]}>
            <CreateEvent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-event/:id"
        element={
          <ProtectedRoute role={["organizer", "admin"]}>
            <EditEvent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-events"
        element={
          <ProtectedRoute role={["organizer", "admin"]}>
            <ManageEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute role={["organizer", "admin"]}>
            <Analytics />
          </ProtectedRoute>
        }
      />

      {/* ===================== 404 PAGE ===================== */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;