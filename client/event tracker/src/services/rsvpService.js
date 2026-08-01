import api from "./api";

export const createRSVP = async (eventId) => {
  return api.post(`/events/${eventId}/rsvp`);
};

export const cancelRSVP = async (eventId) => {
  return api.delete(`/events/${eventId}/rsvp`);
};

export const getMyRSVPs = async () => {
  return api.get("/my-rsvps");
};
