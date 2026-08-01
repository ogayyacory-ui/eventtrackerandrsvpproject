import api from "./api";

export const login = async (credentials) => {
  return api.post("/login", credentials);
};

export const register = async (userData) => {
  return api.post("/register", userData);
};

export const getCurrentUser = async () => {
  return api.get("/me");
};

export const logout = () => {
  localStorage.removeItem("token");
};
