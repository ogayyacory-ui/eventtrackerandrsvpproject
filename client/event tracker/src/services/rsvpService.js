import api from "./api";

export const createRSVP = async (eventId) => {
  return api.post(`/api/events/${eventId}/rsvp`);
};

export const cancelRSVP = async (eventId) => {
  return api.delete(`/api/events/${eventId}/rsvp`);
};

export const getMyRSVPs = async () => {
  return api.get("/api/users/me/rsvps");
};
