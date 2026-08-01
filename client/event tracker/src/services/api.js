const API_BASE_URL = "http://127.0.0.1:5000/api";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

const api = {
  get: (path) => request(path),
  post: (path, data) => request(path, {
    method: "POST",
    body: data === undefined ? undefined : JSON.stringify(data),
  }),
  put: (path, data) => request(path, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export default api;
