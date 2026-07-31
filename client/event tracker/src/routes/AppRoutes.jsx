import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import MyRSVPs from "../pages/MyRSVPs";
import Dashboard from "../pages/Dashboard";
import CreateEvent from "../pages/CreateEvent";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/my-rsvps" element={<MyRSVPs />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;