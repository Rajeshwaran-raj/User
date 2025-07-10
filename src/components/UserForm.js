import React, { useState } from 'react';
import { createUser } from '../services/api';

export default function UserForm({ onUserCreated }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    city: '',
    created_by: 'admin'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(formData);
    onUserCreated();
    setFormData({ firstname: '', lastname: '', email: '', age: '', city: '', created_by: 'admin' });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
      <input name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
      <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
      <button type="submit">Create User</button>
    </form>
  );
}