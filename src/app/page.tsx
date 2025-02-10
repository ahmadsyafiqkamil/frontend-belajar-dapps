'use client'

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const fetchMessage = async () => {
    const response = await fetch("http://127.0.0.1:8000/get-message/");
    const data = await response.json();
    setMessage(data.message);
  };

  const updateMessage = async () => {
    const requestBody = { new_message: newMessage };
    const queryParams = new URLSearchParams(requestBody).toString();
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/set-message/?${queryParams}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      
      if (data.status === "success") {
        alert("Message updated!");
        fetchMessage();
      } else {
        console.error("Failed to update message:", data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Foundry + FastAPI + React</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <button
          onClick={fetchMessage}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mb-4"
        >
          Fetch Message
        </button>
        <p className="text-lg font-medium text-gray-700 mb-4">
          Current Message: <span className="text-blue-600">{message || "No message available"}</span>
        </p>
        <input
          type="text"
          placeholder="Enter new message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={updateMessage}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Update Message
        </button>
      </div>
    </div>
  );
}
