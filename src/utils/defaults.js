import { STORAGE, getItem, setItem } from "./storage";

export function ensureDefaults() {
  const users = getItem(STORAGE.users);

  if (!users.find((u) => u.role === "admin")) {
    users.push({
      id: "0000",
      name: "Admin",
      email: "admin@admin.com",
      phone: "0000",
      password: "admin",
      role: "admin",
    });
    setItem(STORAGE.users, users);
  }

  if (!localStorage.getItem(STORAGE.connections))
    setItem(STORAGE.connections, []);

  if (!localStorage.getItem(STORAGE.complaints))
    setItem(STORAGE.complaints, []);
}
