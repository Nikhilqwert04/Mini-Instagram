import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://mini-instagram-1-yy2m.onrender.com" );

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Socket.IO Chat</h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <button onClick={sendMessage} style={{ padding: "5px 10px" }}>
        Send
      </button>

      <div style={{ marginTop: "20px" }}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
