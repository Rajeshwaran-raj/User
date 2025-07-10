// src/pages/CreateUserPage.js
import React, { useState } from "react";
import UserForm from "../components/UserForm";

const CreateUserPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="main-container">
        <h1 className="page-header">📝 Create User</h1>
      <div className="box left">
        <UserForm onUserCreated={() => setRefresh(!refresh)} />
      </div>
    </div>
  );
};

export default CreateUserPage;
