
import api from "./api";

export const getEvents = async () => {
  const data = await api.get("/api/events");
  return data.items || [];
};

export const getEvent = async (id) => {
  return api.get(`/api/events/${id}`);
};

export const createEvent = async (eventData) => {
  return api.post("/api/events", eventData);
};

export const updateEvent = async (id, eventData) => {
  return api.put(`/api/events/${id}`, eventData);
};

export const deleteEvent = async (id) => {
  return api.delete(`/api/events/${id}`);
};
