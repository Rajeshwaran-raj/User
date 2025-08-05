// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import CreateUserPage from "./Pages/CreateUserPage";
import UserListPage from "./Pages/UserListPage";
import { isAuthenticated } from "./utils/auth";

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
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected dashboard and subroutes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? (
              <DashboardPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/create"
          element={
            isAuthenticated() ? (
              <DashboardPage
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                page="create"
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/users"
          element={
            isAuthenticated() ? (
              <DashboardPage
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                page="users"
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/dashboard/users" />} />
      </Routes>
    </Router>
  );
}

export default App;
