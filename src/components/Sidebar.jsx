import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="admin-sidebar">
      <h2 className="admin-title">Admin Panel</h2>

      <nav className="admin-menu">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin?view=complaints">Complaints</Link>
        <Link to="/admin?view=connections">Connections</Link>
        <Link to="/logout" className="logout-btn">Logout</Link>
      </nav>
    </div>
  );
}
