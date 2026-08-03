import api from "./api";

export async function getEvents(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== "" && value != null),
  );
  return api.get(`/api/events${query.size ? `?${query}` : ""}`);
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
