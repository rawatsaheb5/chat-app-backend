const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const dotenv = require('dotenv')
dotenv.config();
const io = new Server(server, {
  cors: {
    origin: process.env.DOMAIN_URL, 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// if you have rest api then you have to use app.use(cors()) other wise no need
app.use(
  cors({
    origin: process.env.DOMAIN_URL, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("message-from-client", (message) => {
    console.log(message);
    socket.broadcast.emit("message-from-server", message);
  });
  socket.on("disconnect", (reason) => {
    console.log("Disconnected from server:", reason);
  });
});
server.listen(5000, () => {
  console.log("the server is listening at port 5000");
});
