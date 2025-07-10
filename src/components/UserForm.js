// src/components/UserForm.js

import React, { useState } from "react";
import { createUser } from "../services/api";
import "./UserForm.css";

export default function UserForm({ onUserCreated }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    city: "",
    created_by: "admin",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    const { firstname, lastname, email, age, city } = formData;
    if (!firstname || !lastname || !email || !age || !city) {
      return "All fields are required.";
    }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return "Invalid email format.";
    }
    if (isNaN(age) || age <= 0) {
      return "Age must be a positive number.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await createUser(formData);
      setSuccess("User created successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        age: "",
        city: "",
        created_by: "admin",
      });
      setError("");
      if (onUserCreated) onUserCreated();
    } catch (err) {
      setError("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form-container">
      <h2>Create User</h2>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <form onSubmit={handleSubmit} className="user-form">
        <input
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
