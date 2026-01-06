import React from "react";

export default function StatusBadge({ status }) {
  const styles = {
    open: { background: "#ffdddd", color: "#d00000" },
    resolved: { background: "#ddffdd", color: "#007f00" },
    pending: { background: "#fff3cd", color: "#b88600" },
  };

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "8px",
        fontSize: "12px",
        ...styles[status],
      }}
    >
      {status.toUpperCase()}
    </span>
  );
}
