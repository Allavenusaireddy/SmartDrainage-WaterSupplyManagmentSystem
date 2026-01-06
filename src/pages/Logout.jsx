import { useEffect } from "react";
import { logout } from "../utils/auth";

export default function Logout() {
  useEffect(() => {
    logout();           // removes user from localStorage
    window.location.href = "/register"; // redirect to Register page
  }, []);

  // return <div>Logging out...</div>;
}
