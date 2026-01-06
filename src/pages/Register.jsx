import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE, getItem, setItem } from "../utils/storage";
import { setCurrentUser } from "../utils/auth";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  function submit(e) {
    e.preventDefault();

    const users = getItem(STORAGE.users);
    users.push({ id: "u-" + Date.now(), ...form, role: "user" });

    setItem(STORAGE.users, users);
    setCurrentUser(users[users.length - 1]);

    nav("/login");
  }

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>

      <form onSubmit={submit}>
        {["name", "email", "phone", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}

        <button className="auth-btn">Register</button>

        <p className="auth-bottom-text">
          Already have an account?
          <a href="/login" className="auth-link"> Login</a>
        </p>
      </form>
    </div>
  );
}
