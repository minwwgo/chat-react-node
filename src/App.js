import React,{useState,useEffect} from 'react';
import './App.css';

function App() {
  const [messages,setMessages]=useState([ ]);
  const [newMessage,setNewMessage]=useState({id:"",text:"",from:""})
  useEffect(()=>{
    fetch(`https://cyf-minwwgo-chat-server.herokuapp.com/messages`)
    .then(res=>res.json())
    .then(data=> setMessages(data))

  },[])
  function handleNewMessage(e) {
    
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log(newMessage);
    fetch(`https://minwwgo-chat-server.herokuapp.com/messages,{method:`POST`,body:formData}`);
  }

  return (
    <div className="App">
      {messages.map((message) => (
        <div>
          {message.id} -{message.from} -{message.text}
        </div>
      ))}

      <div>
        <p>
          id:
          <input
            type="text"
            name="id"
            value={newMessage.id}
            onChange={handleNewMessage}
          />
          <br />
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
        <button type="submit" onSubmit={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
