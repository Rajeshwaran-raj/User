// src/App.js
import React, { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "./styles.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="main-container">
      <h1 className="header">User Management</h1>

      <div className="grid-boxes">
        <div className="box left">
          <UserForm onUserCreated={() => setRefresh(!refresh)} />
        </div>
        <div className="box right">
          <UserList key={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;
