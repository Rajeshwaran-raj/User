import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/api';

export default function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data.data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstname} {user.lastname} ({user.email})
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
