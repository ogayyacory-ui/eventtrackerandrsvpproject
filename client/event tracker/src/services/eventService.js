import api from "./api";

export async function getEvents() {
  const data = await api.get("/api/events");
  return data.items || [];
}

export async function getEvent(id) {
  return api.get(`/api/events/${id}`);
}

export async function createEvent(eventData) {
  return api.post("/api/events", eventData);
}

export async function updateEvent(id, eventData) {
  return api.patch(`/api/events/${id}`, eventData);
}

export async function deleteEvent(id) {
  return api.delete(`/api/events/${id}`);
}
