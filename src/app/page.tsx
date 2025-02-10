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
    const queryParams = new URLSearchParams(requestBody).toString(); // Ubah objek menjadi query string
    
    console.log("Sending request to:", `http://127.0.0.1:8000/set-message/?${queryParams}`);
    
    const response = await fetch(`http://127.0.0.1:8000/set-message/?${queryParams}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log("Response from server:", data); // Log response untuk debugging
    
    if (data.status === "success") {
        alert("Message updated!");
        console.log("Transaction hash:", data.tx_hash); // Log transaction hash
        fetchMessage();
    } else {
        console.error("Failed to update message:", data); // Log jika ada error
    }
};


  return (
    <div>
      <h1>Foundry + FastAPI + React</h1>
      <button onClick={fetchMessage}>Fetch Message</button>
      <p>Current Message: {message}</p>
      <input
        type="text"
        placeholder="Enter new message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={updateMessage}>Update Message</button>
    </div>
  );
}




