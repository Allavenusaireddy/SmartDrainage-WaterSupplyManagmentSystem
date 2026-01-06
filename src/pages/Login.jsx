import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE, getItem } from "../utils/storage";
import { setCurrentUser } from "../utils/auth";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();

    const users = getItem(STORAGE.users);
    const user = users.find(
      (u) =>
        u.name === form.name &&
        // u.phone === form.phone &&
        u.password === form.password
    );

    if (!user) {
      setErr("Invalid credentials");
      return;
    }

    setCurrentUser(user);
    nav("/home");
  }

  return (
    <div className="auth-container">
      <h2>User Login</h2>

      {err && <div className="auth-error">{err}</div>}

      <form onSubmit={submit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        /> */}

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="auth-btn">Login</button>

        <p className="auth-bottom-text">
          Don’t have an account?
          <a href="/register" className="auth-link"> Create One</a>
        </p>
      </form>
    </div>
  );
}
