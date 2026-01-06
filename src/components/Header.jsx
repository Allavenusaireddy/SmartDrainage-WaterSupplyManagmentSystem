
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

export default function Header() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const updateUser = () => setUser(getCurrentUser());

    window.addEventListener("storage", updateUser);
    window.addEventListener("user-updated", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("user-updated", updateUser);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* LOGO */}
        <Link to="/" className="logo">
          Smart Drainage & Water Supply
        </Link>

        {/* NAVIGATION */}
        <nav className="nav-links">

          {/* When NOT logged in */}
          {!user && (
            <>
              <Link to="/register" className="nav-item">Register</Link>
              <Link to="/login" className="nav-item">User Login</Link>
              <Link to="/admin-login" className="nav-item">Admin Login</Link>
            </>
          )}

          {/* When logged in */}
          {user && (
            <>
              {/* Admin ONLY link */}
              {user.role === "admin" && (
                <Link to="/admin?view=dashboard" className="nav-item">
                  Admin Dashboard
                </Link>
              )}

              {/* REMOVE HOME & PROFILE FROM HEADER */}
              {/* No Home link */}
              {/* No Profile link */}

              {/* Logout button (optional) */}
              {/* 
                If you want logout here, enable again:
                <Link to="/logout" className="logout-btn-nav">Logout</Link>
              */}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
