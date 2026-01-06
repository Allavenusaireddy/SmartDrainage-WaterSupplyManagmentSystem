import React, { useState } from "react";
import { STORAGE, getItem, setItem } from "../utils/storage";
import { getCurrentUser } from "../utils/auth";

export default function NewConnection() {
  const user = getCurrentUser();

  const [form, setForm] = useState({
    name: user.name,
    address: "",
    state: "",
    country: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const all = getItem(STORAGE.connections);

    all.push({
      id: Date.now(),
      userId: user.id,
      name: form.name,
      address: form.address,
      state: form.state,
      country: form.country,
      status: "pending",  // FIXED
    });

    setItem(STORAGE.connections, all);

    alert("Water Connection Request Submitted!");

    setForm({
      name: user.name,
      address: "",
      state: "",
      country: "",
    });
  }

  return (
    <div className="form-container">
      <h2 className="form-title">New Water Connection</h2>

      <form onSubmit={handleSubmit} className="form-fields">

        <input className="form-input"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input className="form-input"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input className="form-input"
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />

        <input className="form-input"
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />

        <button className="btn-primary">Submit Request</button>
      </form>
    </div>
  );
}
