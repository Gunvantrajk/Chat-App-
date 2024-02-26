const {Server, Socket} = require("socket.io");

const io = new Server({cors:"http://localhost:5173"});

let onlineUsers = [];

io.on("connection", (Socket) => {console.log("new Connection", Socket.id);
Socket.on("addNewUser", (userId) =>{
    !onlineUsers.some(user => user.userId === userId) &&
    onlineUsers.push({
        userId,
        SocketId: Socket.id,
    });
   
});
console.log("onlineUsers",onlineUsers);

io.emit("getOnlineUsers",onlineUsers);

//
Socket.on("sendMessage", (message)=>{
    const user = onlineUsers.find(user => user.id === message.recipientId);

    if(user){
        io.to(user.SocketId).emit("getMessage", message);
    }
})

Socket.on("disconnect", ()=>{
    onlineUsers = onlineUsers.filter(user => user.SocketId !== Socket.id);

    io.emit("getOnlineUsers",onlineUsers);
});
});



io.listen(3000);

