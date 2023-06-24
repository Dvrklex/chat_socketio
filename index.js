const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { addUser, removeUser, getUsers, getUser, addMessage, getMessages } = require("./userModule");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("set nickname", (id, user) => {
    addUser(id, user);
    io.emit("userConnected", `${getUser(socket.id).nickname} se ha unido al chat!`);//,getMessages()
    console.log("userConnected");
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("userDisconnected", `${getUser(socket.id).nickname} se ha desconectado...`);
    console.log("userDisconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", `${getUser(socket.id).nickname}: ${msg}`, getMessages());
    addMessage(socket.id, msg);
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing", getUser(socket.id).nickname);
  });

  socket.on("typingStop", () => {
    socket.broadcast.emit("typingStop");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
