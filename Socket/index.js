const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  //add new user
  socket.on("add-new-user", (newUserId) => {
    console.log(newUserId,"===newuser")
    //if user is not added previously
    if (!activeUsers.some((user) => user.userId == newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    //send all active users to client
    io.emit("get-users", activeUsers);
  });

  socket.on('disconnect',()=>{
     // remove user from active users
     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
     console.log("User Disconnected", activeUsers);
     // send all active users to all users
     io.emit("get-users", activeUsers);
  })

  socket.on('send-message',(data)=>{
    const {receiverId } = data
    //finding the reciver 
    const user = activeUsers.find(user=>user.userId === receiverId)
    console.log("Sending from socket to :", receiverId)
    console.log("Data: ", data)
    //if the user exits then send message to that perticular user
    if(user){
        io.to(user.socketId).emit('receive-message',data)
    }
  })
});
