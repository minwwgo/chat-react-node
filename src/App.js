import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ text: "", from: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [updatingMessageId, setUpdatingMessageId] = useState(null);

  useEffect(() => {
    fetch(`https://unwillingprobablecontrolpanel.minko1.repl.co/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);
  function handleNewMessage(e) {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(newMessage);

    fetch(`https://unwillingprobablecontrolpanel.minko1.repl.co/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    })
      .then((res) => res.json())
      .then((updateMessagesArray) => {
        setNewMessage({ from: "", text: "" });
        setMessages(updateMessagesArray);
      })
      .catch((err) => console.log(err));
  }
  function handleEditMessage(e) {
    let messageId = Number(e.target.value);

    let foundMessage = messages.find((ele) => {
      return ele.id === messageId;
    });

    if (!foundMessage) {
      console.log("no message found ");
      return;
    } else {
      setUpdatingMessageId(messageId);
      setIsEditing(true);
      setNewMessage(foundMessage);
    }
  }

  function handleSaveMessage(e) {
    e.preventDefault();
    console.log(newMessage);
// /hello/${updatingMessageId}
    fetch(
      `https://unwillingprobablecontrolpanel.minko1.repl.co/messages/`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE"
        },
        body: JSON.stringify(newMessage),
      }
    )
      .then((res) => {
        console.log("testing", res);
        res.json();
      })
      .then((updateMessagesArray) => {
        setNewMessage({ from: "", text: "" });
        setMessages(updateMessagesArray);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">

      {messages && messages.map((message) => (
        <div key={message.id}>
          {message.id} -{message.from} -{message.text} {"  "}
          <button onClick={handleEditMessage} value={message.id}>
            {" "}
            edit{" "}
          </button>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <p>
          Name:
          <input
            type="text"
            name="from"
            placeholder="Your Name"
            value={newMessage.from}
            onChange={handleNewMessage}
          />
          <br />
          Message:
          <input
            type="text"
            name="text"
            placeholder="The message..."
            value={newMessage.text}
            onChange={handleNewMessage}
          />
          <br />
          TimeSent:
        </p>
        {isEditing ? (
          <button onClick={handleSaveMessage}> Save</button>
        ) : (
          <button type="submit">Send</button>
        )}
      </form>
    </div>
  );
}

export default App;
