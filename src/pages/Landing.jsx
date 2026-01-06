import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ensureDefaults } from "../utils/defaults";

export default function Landing() {
  useEffect(() => ensureDefaults(), []);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Smart Drainage & Water Supply System</h1>

        <p className="landing-subtitle">
          Easily report drainage issues, track complaints, and request new water connections.
        </p>

        <div className="landing-buttons">
          <Link to="/register" className="landing-btn primary">Register</Link>
          <Link to="/login" className="landing-btn secondary">Login</Link>
        </div>
      </div>
    </div>
  );
}
