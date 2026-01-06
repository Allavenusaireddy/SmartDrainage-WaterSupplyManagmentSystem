export const STORAGE = {
  users: "sd_users",
  currentUser: "sd_currentUser",
  connections: "sd_connections",
  complaints: "sd_complaints",
};

export const getItem = (key) =>
  JSON.parse(localStorage.getItem(key) || "[]");

export const setItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
