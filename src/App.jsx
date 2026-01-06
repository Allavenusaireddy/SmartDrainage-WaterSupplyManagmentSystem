import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import "./App.css";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Logout from "./pages/Logout";
import AdminLogin from "./pages/AdminLogin";


export default function App() {
  
  return (
    <BrowserRouter>

    <Header />
      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            

        </Routes>
      </main>
    </BrowserRouter>
  );
}
