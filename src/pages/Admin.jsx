import React, { useEffect, useState } from "react";
import { STORAGE, getItem, setItem } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";



export default function Admin() {
  const [view, setView] = useState("dashboard");
  const [complaints, setComplaints] = useState([]);
  const [connections, setConnections] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

function handleAdminLogout() {
  logout(); // clears currentUser from localStorage

  // notify header / app state
  window.dispatchEvent(new Event("user-updated"));

  // redirect to admin login
  navigate("/admin-login", { replace: true });
}

  // Load data from storage
  useEffect(() => {
    setComplaints(getItem(STORAGE.complaints));     // sd_complaints
    setConnections(getItem(STORAGE.connections));   // sd_connections
    setUsers(getItem(STORAGE.users));               // sd_users

    const params = new URLSearchParams(window.location.search);
    setView(params.get("view") || "dashboard");
  }, []);

  // -----------------------------
  // Update Complaint Status
  // -----------------------------
  function updateComplaintStatus(id, newStatus) {
    const all = getItem(STORAGE.complaints);
    const index = all.findIndex((c) => c.id === id);

    all[index].status = newStatus;

    setItem(STORAGE.complaints, all);
    setComplaints(all);
  }

  // -----------------------------
  // Update Water Connection Status
  // -----------------------------
  function updateConnectionStatus(id, newStatus) {
    const all = getItem(STORAGE.connections);
    const index = all.findIndex((c) => c.id === id);

    all[index].status = newStatus;

    setItem(STORAGE.connections, all);
    setConnections(all);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <div style={{ width: "230px", background: "#1a1a2e", padding: "20px", color: "white" }}>
        <h2>Admin Panel</h2>
        
        <p onClick={() => setView("dashboard")} className="admin-menu">Dashboard</p>
        <p onClick={() => setView("complaints")} className="admin-menu">Complaints</p>
        <p onClick={() => setView("connections")} className="admin-menu">Water Connections</p>
        
      </div>
      <button
  onClick={handleAdminLogout}
  className="admin-logout-btn"
>
  Logout
</button>


      {/* MAIN CONTENT */}
      <div style={{ flexGrow: 1, padding: "25px" }}>

        {/* ========================= DASHBOARD ========================= */}
        {view === "dashboard" && (
          <>
            <h2>Dashboard</h2>

            <div className="admin-dashboard-grid">

              <div className="dashboard-card">
                <h3>Total Complaints</h3>
                <p>{complaints.length}</p>
              </div>

              <div className="dashboard-card">
                <h3>Pending Complaints</h3>
                <p>{complaints.filter(c => c.status === "pending").length}</p>
              </div>

              <div className="dashboard-card">
                <h3>Resolved Complaints</h3>
                <p>{complaints.filter(c => c.status === "resolved").length}</p>
              </div>

              <div className="dashboard-card">
                <h3>Water Connections</h3>
                <p>{connections.length}</p>
              </div>

            </div>
          </>
        )}

        {/* ========================= COMPLAINTS ========================= */}
        {view === "complaints" && (
          <>
            <h2>All Complaints</h2>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Address</th>
                  <th>Issue</th>
                  <th>Description</th>
                  <th>Images</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id}>
                    <td>{users.find(u => u.id === c.userId)?.name}</td>
                    <td>{c.address}</td>
                    <td>{c.issueType}</td>
                    <td>{c.description}</td>

                    <td>
                      {c.images.map((img, i) => (
                        <img key={i} src={img} className="complaint-img" alt="" />
                      ))}
                    </td>

                    <td>{c.status}</td>

                    <td>
                      <select
                        value={c.status}
                        onChange={(e) => updateComplaintStatus(c.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ========================= CONNECTIONS ========================= */}
        {view === "connections" && (
          <>
            <h2>Water Connections</h2>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Address</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>

              <tbody>
                {connections.map((conn) => (
                  <tr key={conn.id}>
                    <td>{users.find(u => u.id === conn.userId)?.name}</td>
                    <td>{conn.address}</td>
                    <td>{conn.state}</td>
                    <td>{conn.country}</td>
                    <td>{conn.status}</td>

                    <td>
                      <select
                        value={conn.status}
                        onChange={(e) => updateConnectionStatus(conn.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

      </div>
    </div>
  );
}
