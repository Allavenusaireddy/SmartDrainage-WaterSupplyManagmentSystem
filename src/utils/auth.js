import { STORAGE } from "./storage";

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(STORAGE.currentUser) || "null");

export const setCurrentUser = (user) =>
  localStorage.setItem(STORAGE.currentUser, JSON.stringify(user));

export const logout = () => localStorage.removeItem(STORAGE.currentUser);
