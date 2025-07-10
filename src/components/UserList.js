// src/components/UserList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css"; // Optional CSS

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load users.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      setFilteredUsers(filteredUsers.filter(user => user.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setFilteredUsers(users.filter(user =>
      user.firstname.toLowerCase().includes(keyword) ||
      user.lastname.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.city.toLowerCase().includes(keyword)
    ));
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();

  const handleExportCSV = () => {
  const headers = ["Name", "Email", "Age", "City", "Created", "Updated"];
  const rows = filteredUsers.map((user) => [
    `${user.firstname} ${user.lastname}`,
    user.email,
    user.age,
    user.city,
    formatDate(user.created_at),
    formatDate(user.updated_at),
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "user_data.csv");
  document.body.appendChild(link);
  link.click();
};


  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <button onClick={handleExportCSV} className="export-btn">Export to CSV</button><br></br>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by name, email, or city"
        className="search-input"
      />

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && filteredUsers.length === 0 && <p>No users found.</p>}

      {!loading && filteredUsers.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>City</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                    <span className={`badge badge-${user.city.toLowerCase()}`}>{user.city}</span>
                 </td>
                <td>{formatDate(user.created_at)}</td>
                <td>{formatDate(user.updated_at)}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
