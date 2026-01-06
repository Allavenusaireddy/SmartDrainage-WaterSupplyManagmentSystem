// import React, { useState } from "react";
// import NewConnection from "../features/NewConnection";
// import RaiseComplaint from "../features/RaiseComplaint";
// import MyRequests from "../features/MyRequests";
// import { getCurrentUser } from "../utils/auth";


// export default function Home() {
//   const user = getCurrentUser();
//   const [view, setView] = useState("none");
//   return (
//     <div className="home-container">
//       <h2 className="home-title">Welcome, {user?.name}</h2>

//       {/* ACTION CARDS */}
//       <div className="home-card-grid">

//         <div className="home-card" onClick={() => setView("connection")}>
//           <h3>Add New Water Connection</h3>
//           <p>Submit details to request a new water connection.</p>
//         </div>

//         <div className="home-card danger" onClick={() => setView("complaint")}>
//           <h3>Raise Complaint</h3>
//           <p>Report drainage or water supply issues instantly.</p>
//         </div>

//         <div className="home-card secondary" onClick={() => setView("my")}>
//           <h3>My Requests</h3>
//           <p>View your submitted requests and statuses.</p>
//         </div>

//       </div>

//       {/* SECTIONS */}
//       {view === "connection" && <NewConnection />}
//       {view === "complaint" && <RaiseComplaint />}
//       {view === "my" && <MyRequests />}

//       {view === "none" && (
//         <div className="home-placeholder">
//           Choose an option from above to get started.
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewConnection from "../features/NewConnection";
import RaiseComplaint from "../features/RaiseComplaint";
import MyRequests from "../features/MyRequests";
import { getCurrentUser, setCurrentUser } from "../utils/auth";

export default function Home() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [view, setView] = useState("none");

  // LOGOUT FUNCTION
  function handleLogout() {
    setCurrentUser(null); // remove user session

    // Notify header to update immediately
    window.dispatchEvent(new Event("user-updated"));

    navigate("/login", { replace: true });
  }

  return (
    <div className="home-container">

      {/* TOP BAR */}
      <div className="home-topbar">
        <h2 className="home-title">Welcome, {user?.name}</h2>

      <div className="home-actions">
  <button onClick={() => navigate("/profile")} className="action-btn profile-btn">
    Profile
  </button>

  <button onClick={handleLogout} className="action-btn logout-btn">
    Logout
  </button>
</div>

</div>

      {/* ACTION CARDS */}
      <div className="home-card-grid">

        <div className="home-card" onClick={() => setView("connection")}>
          <h3>Add New Water Connection</h3>
          <p>Submit details to request a new water connection.</p>
        </div>

        <div className="home-card danger" onClick={() => setView("complaint")}>
          <h3>Raise Complaint</h3>
          <p>Report drainage or water supply issues instantly.</p>
        </div>

        <div className="home-card secondary" onClick={() => setView("my")}>
          <h3>My Requests</h3>
          <p>View your submitted requests and statuses.</p>
        </div>

      </div>

      {/* SECTIONS */}
      {view === "connection" && <NewConnection />}
      {view === "complaint" && <RaiseComplaint />}
      {view === "my" && <MyRequests />}

      {view === "none" && (
        <div className="home-placeholder">
          Choose an option from above to get started.
        </div>
      )}
    </div>
  );
}

