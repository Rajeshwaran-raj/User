import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + '/users',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getUsers = () => api.get('/');
export const getUserById = (id) => api.get(`/${id}`);
export const createUser = (user) => api.post('/', user);
export const deleteUser = (id) => api.delete(`/${id}`);

export default api;