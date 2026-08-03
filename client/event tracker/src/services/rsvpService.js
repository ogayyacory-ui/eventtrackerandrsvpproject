import api from "./api";

export async function createRSVP(eventId) {
  return api.post(`/api/events/${eventId}/rsvp`);
}

export async function cancelRSVP(eventId) {
  return api.delete(`/api/events/${eventId}/rsvp`);
}

export async function getMyRSVPs() {
  return api.get("/api/users/me/rsvps");
}