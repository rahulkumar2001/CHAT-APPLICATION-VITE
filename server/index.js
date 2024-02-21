const express=require("express");
const app=express();
const http=require("http")
const {Server}=require("socket.io");
const cors=require("cors");


app.use(cors());
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
    }
});

io.on("connection",(socket)=>{
    console.log(`User-Connected: ${socket.id}`);

    socket.on("join_room", (data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room:${data }`); 
    });

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message", data)

    });

    socket.on("disconnect",()=>{
        console.log("USER Disconnected",socket.id);

    });
});



server.listen(3000,()=>{
    console.log("server is running")
})