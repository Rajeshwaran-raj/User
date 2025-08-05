// src/utils/auth.js

export const login = (username, password) => {
  // Fake login: hardcoded credentials
  if (username === "admin" && password === "admin") {
    localStorage.setItem("user", JSON.stringify({ username }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};
