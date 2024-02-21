import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chat from './Chat.jsx'

import io from "socket.io-client";

const socket=io.connect("http://localhost:3000");



function App() {
   const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
 const [showChat,setShowChat]=useState(false);

 const  joinRoom=()=>{
    if (username!== "" && room !== ""){
        socket.emit("join_room",room);
        setShowChat(true);
    }
 }
  return (
    <>
    
      <div className="App">
        {!showChat ? ( 
        <div className="joinChatContainer">
        <h3>Join Chat</h3>
        <input type="text" placeholder="Enter your name.." onChange={(even)=>{
          setUsername(event.target.value);
        }}/>

        <input type="text" placeholder="Enter room id" onChange={(even)=>{
          setRoom(event.target.value);
          }}/>

        <button onClick={joinRoom}>Join Room</button>
        </div>
        )
         :
        (<Chat socket={socket} username={username} room={room}/> 
        )}
      </div>
       
    </>
  )
}

export default App
