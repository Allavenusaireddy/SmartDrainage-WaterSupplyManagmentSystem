import React from "react";

export default function DashboardCard({ title, count, icon }) {
  return (
    <div className="dashboard-card">
      <div className="icon-box">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{count}</p>
      </div>
    </div>
  );
}
