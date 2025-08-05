// src/pages/DashboardPage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import CreateUserPage from "./CreateUserPage";
import UserListPage from "./UserListPage";

const DashboardPage = ({ isDarkMode, setIsDarkMode, page }) => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="header-bar">
        <h1 className="header">User Management</h1>
        <div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="toggle-theme"
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="toggle-theme"
            style={{ marginLeft: "10px" }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <nav className="nav-bar">
        <Link to="/dashboard/create" className="nav-link">
          ➕ Create User
        </Link>
        <Link to="/dashboard/users" className="nav-link">
          📋 User List
        </Link>
      </nav>

      {/* Page content */}
      {page === "create" && <CreateUserPage />}
      {page === "users" && <UserListPage />}
      {!page && <p style={{ padding: "20px" }}>Welcome to your dashboard.</p>}
    </div>
  );
};

export default DashboardPage;
