// src/App.js
import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "./styles.css";


function App() {
  const [refresh, setRefresh] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ⬇️ Apply dark-mode class to body tag directly
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="main-container">
      <div className="header-bar">
        <h1 className="header">User Management</h1>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="toggle-theme">
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="grid-boxes">
        <div className="box left">
          <h2 className="box-title">📝 Create User</h2>
          <UserForm onUserCreated={() => setRefresh(!refresh)} />
        </div>
        <div className="box right">
          <h2 className="box-title">📋 User List</h2>
          <UserList key={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;