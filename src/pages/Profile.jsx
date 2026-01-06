// import React, { useState } from "react";
// import { STORAGE, getItem, setItem } from "../utils/storage";
// import { getCurrentUser, setCurrentUser } from "../utils/auth";

// export default function Profile() {
//   const user = getCurrentUser();
//   const [form, setForm] = useState(user);
//   const [msg, setMsg] = useState("");

//   function save(e) {
//     e.preventDefault();

//     const users = getItem(STORAGE.users);
//     const idx = users.findIndex((u) => u.id === user.id);

//     users[idx] = { ...users[idx], ...form };

//     setItem(STORAGE.users, users);
//     setCurrentUser(users[idx]);

//     setMsg("Profile updated successfully!");
//   }

//   return (
//     <div className="profile-container fade-in">
//       <h2 className="profile-title">My Profile</h2>

//       {msg && <div className="profile-success">{msg}</div>}

//       <form className="profile-form" onSubmit={save}>

//         <label className="profile-label">Full Name</label>
//         <input
//           className="profile-input"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <label className="profile-label">Email Address</label>
//         <input
//           className="profile-input"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <label className="profile-label">Phone Number</label>
//         <input
//           className="profile-input"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//         />

//         <label className="profile-label">Password</label>
//         <input
//           className="profile-input"
//           type="password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button className="profile-btn">Update Profile</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE, getItem, setItem } from "../utils/storage";
import { getCurrentUser, setCurrentUser } from "../utils/auth";

export default function Profile() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [form, setForm] = useState(user);
  const [msg, setMsg] = useState("");

  function save(e) {
    e.preventDefault();

    const users = getItem(STORAGE.users);
    const idx = users.findIndex((u) => u.id === user.id);

    users[idx] = { ...users[idx], ...form };

    setItem(STORAGE.users, users);
    setCurrentUser(users[idx]);

    setMsg("Profile updated successfully!");
  }

  return (
    <div className="profile-container fade-in">

      {/* WEBSITE STYLE BACK BUTTON */}
      <button className="back-btn-web" onClick={() => navigate("/home")}>
        Back
      </button>

      <h2 className="profile-title">My Profile</h2>

      {msg && <div className="profile-success">{msg}</div>}

      <form className="profile-form" onSubmit={save}>

        <label className="profile-label">Full Name</label>
        <input
          className="profile-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="profile-label">Email Address</label>
        <input
          className="profile-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="profile-label">Phone Number</label>
        <input
          className="profile-input"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <label className="profile-label">Password</label>
        <input
          className="profile-input"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="profile-btn">Update Profile</button>
      </form>
    </div>
  );
}
