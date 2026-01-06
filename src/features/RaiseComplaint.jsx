import React, { useState } from "react";
import { STORAGE, getItem, setItem } from "../utils/storage";
import { getCurrentUser } from "../utils/auth";

export default function RaiseComplaint() {
  const user = getCurrentUser();

  const [form, setForm] = useState({
    name: user.name,
    address: "",
    state: "",
    country: "",
    issueType: "drainage",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState("");

  function uploadImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImages((prev) => [...prev, reader.result]);
    reader.readAsDataURL(file);
  }

  function submit(e) {
    e.preventDefault();

    const all = getItem(STORAGE.complaints);

    all.push({
      id: Date.now(),
      userId: user.id,
      ...form,
      images,
      status: "pending", // FIXED
      createdAt: new Date().toISOString(),
    });

    setItem(STORAGE.complaints, all);

    setMsg("Complaint submitted successfully!");

    setForm({
      name: user.name,
      address: "",
      state: "",
      country: "",
      issueType: "drainage",
      description: "",
    });

    setImages([]);
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Raise a Complaint</h2>

      {msg && <div className="success-msg">{msg}</div>}

      <form onSubmit={submit} className="form-fields">

        <input className="form-input"
          placeholder="Name"
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

        <select className="form-input"
          value={form.issueType}
          onChange={(e) => setForm({ ...form, issueType: e.target.value })}
        >
          <option value="drainage">Drainage</option>
          <option value="water">Water Supply</option>
          <option value="other">Other</option>
        </select>

        <textarea className="form-input"
          placeholder="Describe the issue"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label>Upload Images</label>
        <input type="file" accept="image/*" onChange={uploadImage} />

        <div className="image-preview-box">
          {images.map((img, i) => (
            <img key={i} src={img} className="preview-img" alt="" />
          ))}
        </div>

        <button className="btn-danger">Submit Complaint</button>
      </form>
    </div>
  );
}
