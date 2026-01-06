// import React, { useEffect, useState } from "react";
// import { STORAGE, getItem } from "../utils/storage";
// import { getCurrentUser } from "../utils/auth";

// export default function MyRequests() {
//   const user = getCurrentUser();

//   const [complaints, setComplaints] = useState([]);
//   const [connections, setConnections] = useState([]);

//   // Load user's complaints + water connections
//   useEffect(() => {
//     const allComplaints = getItem(STORAGE.complaints);
//     const allConnections = getItem(STORAGE.connections);

//     const mineComplaints = allComplaints.filter((c) => c.userId === user.id);
//     const mineConnections = allConnections.filter((c) => c.userId === user.id);

//     setComplaints(mineComplaints);
//     setConnections(mineConnections);
//   }, [user]); // fixed dependency

//   return (
//     <div>
//       <h2 className="page-title">My Requests</h2>

//       {/* ============================
//               USER COMPLAINTS
//       ============================== */}
//       <h3>My Complaints</h3>

//       {complaints.length === 0 && <p>No complaints added yet.</p>}

//       {complaints.map((c) => (
//         <div key={c.id} className="request-card">

//           <h4>{c.issueType.toUpperCase()}</h4>

          // <p><strong>Name:</strong> {c.name}</p>
          // <p><strong>Address:</strong> {c.address}</p>
          // <p><strong>State:</strong> {c.state}</p>
          // <p><strong>Country:</strong> {c.country}</p>
//           <p><strong>Description:</strong> {c.description}</p>
//           <p><strong>Status:</strong> {c.status}</p>

//           {/* Images */}
//           {c.images?.length > 0 && (
//             <div className="image-row">
//               {c.images.map((img, i) => (
//                 <img key={i} src={img} alt="img" className="request-img" />
//               ))}
//             </div>
//           )}

//         </div>
//       ))}

//       {/* ============================
//            USER WATER CONNECTIONS
//       ============================== */}
//       <h3 style={{ marginTop: "30px" }}>My Water Connection Requests</h3>

//       {connections.length === 0 && <p>No water connections requested yet.</p>}

//       {connections.map((conn) => (
//         <div key={conn.id} className="request-card">

//           <p><strong>Name:</strong> {conn.name}</p>
//           <p><strong>Address:</strong> {conn.address}</p>
//           <p><strong>State:</strong> {conn.state}</p>
//           <p><strong>Country:</strong> {conn.country}</p>
//           <p><strong>Status:</strong> {conn.status}</p>

//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { STORAGE, getItem } from "../utils/storage";
import { getCurrentUser } from "../utils/auth";

export default function MyRequests() {
  const user = getCurrentUser();

  const [complaints, setComplaints] = useState([]);
  const [connections, setConnections] = useState([]);

  // FIX: Always call useEffect, but only run logic if user exists
  useEffect(() => {
    if (!user) return;

    const allComplaints = getItem(STORAGE.complaints);
    const allConnections = getItem(STORAGE.connections);

    setComplaints(allComplaints.filter((c) => c.userId === user.id));
    setConnections(allConnections.filter((c) => c.userId === user.id));
  }, [user?.id]); // SAFE dependency

  // Show message if no user is logged in
  if (!user) {
    return <p className="text-center p-4">Please login to view your requests.</p>;
  }

  return (
    <div>
      <h2 className="page-title">My Requests</h2>

      {/* Complaints */}
      <h3>My Complaints</h3>
      {complaints.length === 0 && <p>No complaints added yet.</p>}

      {complaints.map((c) => (
        <div key={c.id} className="request-card">
          <h4>{c.issueType.toUpperCase()}</h4>
          
          <p><strong>Name:</strong> {c.name}</p>
          <p><strong>Address:</strong> {c.address}</p>
          <p><strong>State:</strong> {c.state}</p>
          <p><strong>Country:</strong> {c.country}</p>
          <p><strong>Description:</strong> {c.description}</p>
          <p><strong>Status:</strong> {c.status}</p>

          {c.images?.length > 0 && (
            <div className="image-row">
              {c.images.map((img, i) => (
                <img key={i} src={img} alt="" className="request-img" />
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Water Connections */}
      <h3 style={{ marginTop: "30px" }}>My Water Connection Requests</h3>
      {connections.length === 0 && <p>No water connections requested yet.</p>}

      {connections.map((conn) => (
        <div key={conn.id} className="request-card">
          <p><strong>Name:</strong> {conn.name}</p>
          <p><strong>Address:</strong> {conn.address}</p>
          <p><strong>State:</strong> {conn.state}</p>
          <p><strong>Country:</strong> {conn.country}</p>
          <p><strong>Status:</strong> {conn.status}</p>
          
        </div>
      ))}
    </div>
  );
}
