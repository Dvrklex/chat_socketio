const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const userModule = require("./userModule");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("set nickname", (id, user) => {
    userModule.addUser(socket.id, user);
    const connectedUsers = userModule.getUsers();
    io.emit("userConnected", `${user} se ha unido al chat!`, userModule.getMessages(), connectedUsers);
    console.log("userConnected");
  });

  socket.on("disconnect", () => {
    const disconnectedUser = userModule.getUser(socket.id);
    userModule.removeUser(socket.id);
    if (disconnectedUser) {
      const connectedUsers = userModule.getUsers();
      io.emit("userDisconnected", `${disconnectedUser.nickname} se ha desconectado...`, connectedUsers);
    }
    console.log("userDisconnected");
  });

  socket.on("chat message", (msg) => {
    const user = userModule.getUser(socket.id);
    if (user) {
      const { nickname } = user;
      io.emit("chat message", `${nickname}: ${msg}`, userModule.getMessages());
      userModule.addMessage(socket.id, msg);
    }
  });

  socket.on("typing", () => {
    const user = userModule.getUser(socket.id);
    if (user) {
      const { nickname } = user;
      io.emit("typing", nickname);
    }
  });

  socket.on("typingStop", () => {
    const user = userModule.getUser(socket.id);
    if (user) {
      const { nickname } = user;
      io.emit("typingStop", nickname);
    }
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
