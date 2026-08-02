import api from "./api";

export const login = async (credentials) => {
  return api.post("/api/auth/login", credentials);
};

export const register = async (userData) => {
  return api.post("/api/auth/register", userData);
};

export const getCurrentUser = async () => {
  return api.get("/api/auth/me");
};

export const logout = () => {
  localStorage.removeItem("token");
};
