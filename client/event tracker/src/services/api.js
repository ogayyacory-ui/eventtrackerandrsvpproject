const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("token");

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch (err) {
    throw new Error(`Network error: Unable to reach ${API_BASE_URL}${path}. ${err.message}`);
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const payloadMessage = data?.message || data?.error;
    throw new Error(payloadMessage || `Request failed: ${response.status} ${response.statusText}`);
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
