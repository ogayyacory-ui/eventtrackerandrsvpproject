import api from "./api";

export const createRSVP = async (eventId) => {
  const response = await api.post(`/events/${eventId}/rsvp`);
  return response.data;
};

export const cancelRSVP = async (eventId) => {
  const response = await api.delete(`/events/${eventId}/rsvp`);
  return response.data;
};

export const getMyRSVPs = async () => {
  const response = await api.get("/my-rsvps");
  return response.data;
};