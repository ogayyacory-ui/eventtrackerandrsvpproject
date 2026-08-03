import api from "./api";

export async function login(credentials) {
  return api.post("/api/auth/login", credentials);
}

export async function register(userData) {
  return api.post("/api/auth/register", userData);
}

export async function getCurrentUser() {
  return api.get("/api/auth/me");
}

export function logout() {
  localStorage.removeItem("token");
}
