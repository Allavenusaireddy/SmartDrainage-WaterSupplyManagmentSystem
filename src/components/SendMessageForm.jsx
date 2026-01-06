import React, { useState } from "react";

export default function SendMessageForm({ onSend }) {
  const [text, setText] = useState("");

  return (
    <div className="flex items-center">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 border rounded"
        placeholder="Message to user"
      />
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => {
          if (text.trim()) {
            onSend(text);
            setText("");
          }
        }}
      >
        Send
      </button>
    </div>
  );
}
