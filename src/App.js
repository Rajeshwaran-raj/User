// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import CreateUserPage from "./Pages/CreateUserPage";
import UserListPage from "./Pages/UserListPage";
import "./styles.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply or remove dark-mode class on body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="main-container">
        {/* Header + Theme Toggle */}
        <div className="header-bar">
          <h1 className="header">User Management</h1>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="toggle-theme">
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="nav-bar">
          <Link to="/create" className="nav-link">➕ Create User</Link>
          <Link to="/users" className="nav-link">📋 User List</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/create" element={<CreateUserPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
