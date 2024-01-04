import express from "express";
import { Server } from "socket.io";
import * as http from "http";

const app = express();
const PORT = 8000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// server-side
io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  // Listen for messages from clients
  socket.on("message", (data) => {
    console.log(`Received message from ${socket.id}: ${data}`);
    io.to(socket.id).emit(
      "reply",
      `Reply from server to ${socket.id}: ${data}`
    );
  });
});

// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${PORT}`);
  console.log(`🚀 WebSocket endpoint ready at ws://localhost:${PORT}`);
});

//--------------------------------------------------------------------------------------
// //javascript code for implementing the concept of listening to Websockets with Express
// import { Socket } from "dgram";
// import express from "express";
// import { Server } from 'socket.io'
// //import ws from 'ws';

// import * as http from "http";

// const app = express();
// const PORT = 8000;

// const httpServer = http.createServer(app);
// const io = new Server(httpServer, { cors: { origin: '*' } });

// // server-side
// io.on("connection", (socket) => {
//     console.log("New client connected " + socket.id);
//     socket.on("client", data => {
//         io.to(socket.id).emit('reply', data);
//     });
// });

// // Now that our HTTP server is fully set up, actually listen.
// httpServer.listen(PORT, () => {
//     console.log(`🚀 Query endpoint ready at http://localhost:${PORT}`);
//     console.log(`🚀 WebSocket endpoint ready at ws://localhost:${PORT}`);
// });

// // import express from 'express';
// // import * as http from 'http';
// // import * as WebSocket from 'ws';
// // const app = express();
// // const server = http.createServer(app);
// // const webSocketServer = new WebSocket.Server({ server });

// // webSocketServer.on('connection', (socket) => {

// //     socket

// //     socket.on('message', (message) => {
// //         console.log("Message from client :: " + message);
// //         socket.send("Echo :: " + message);
// //     });

// //     socket.send("Welcome to chat !!");
// // });
// // server.listen(process.env.PORT || 8080, () => {
// //     console.log('Server started');
// // });
