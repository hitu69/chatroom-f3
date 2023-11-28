const express = require('express');
// a library to create server

const { createServer } = require('http');
const { Server } = require('socket.io');

//intializiation of express server
const app = express();

// creation of an http server
const httpServer = createServer(app);

// api
// access a url (client)
// api sends a json data to client
// client makes request to the server and the server returns a response

// console.log('ok');

// creating a bridge between the clients and this server 
const io = new Server(httpServer, {
  cors: {
    origin: 'http://127.0.0.1:5500',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // socket -> connection

  // socket.on('message',(data)=>{

  // })
  // socket io presents to us -> 2 different methods or functions
  // emit -> to emit message
  // on -> to listen to a message

  // getting this from client
  socket.on('username enter', (data) => {
    console.log('username enter', data);
    // send the message to all the clients
    io.emit('username enter', data);
  });

  socket.on('message', (data) => {
    console.log('message is being sent to all the clients');

    io.emit('message', data);
  });

  socket.on('username left', (username) => {
    io.emit('username left', username);
  });
});

httpServer.listen(3000, () => {
  console.log(`Server listening on PORT 3000`);
});

// nodemon --> dependency

// chat app
// socket.io -> library which helps us chat
// us -> client and server

// there is a whatsapp grp
// client -> group members
// click on send -> server -> sends the message back to the client



// how to start this app
// 1. install node -> lts
// 2. npm init -> to initialize the project
// 3. downloading the dependencies
// 4. npm install <dependency_name>


