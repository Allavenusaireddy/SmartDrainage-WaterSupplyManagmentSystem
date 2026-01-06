import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE, getItem } from "../utils/storage";
import { setCurrentUser } from "../utils/auth";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const users = getItem(STORAGE.users);

    const admin = users.find(
      (u) =>
        u.phone === form.phone &&
        u.password === form.password &&
        u.role === "admin"
    );

    if (!admin) {
      setError("Invalid admin credentials");
      return;
    }

    setCurrentUser(admin);
    navigate("/admin?view=dashboard");
  }

  return (
    <div className="auth-container">
      <h2>Admin Login</h2>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Admin Id"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="auth-btn">Login as Admin</button>

        <p className="auth-bottom-text">
          Go back to <a href="/login" className="auth-link">User Login</a>
        </p>
      </form>
    </div>
  );
}
