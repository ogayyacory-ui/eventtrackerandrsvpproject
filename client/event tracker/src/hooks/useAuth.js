import { useState } from "react";

const API_URL = "http://127.0.0.1:5555"; // your flask backend

export default function useAuth() {
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    // Map your form fields to what Flask expects
    const payload = {
      username: formData.name, // <-- Flask uses "username"
      email: formData.email,
      password: formData.password,
      role: formData.role // only if your backend uses it
    };

    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  };

  const login = async (email, password) => {
    // add this later for login page
  };

  return { register, login, user };
}
