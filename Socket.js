// const express = require('express');
// const router = require("express").Router();
// const app = express();
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');
// const PORT = 'https://social-media7.herokuapp.com/';
// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methoods: ["GET", "POST"],
//     },
// })


// let users = [];

// const addUser = (userId, socketId) => {

//     users.push({ userId, socketId });
// }



// const removeUser = (socketId) => {
//     users = users.filter(user => user.socketId !== socketId);
// }

// const getUser = (userId) => {
//     return users.find(user => user.userId === userId)
// }



// io.on("connection", (socket) => {


//     socket.on('Open_Chat', (conversation) => {
//         console.log('conversation',conversation)
//         conversation.map(conver => {
//             console.log('open room for', conver._id)
//             socket.join(conver._id)
//         })


//     })

//     socket.on('send_message', (data) => {
//         console.log('send_message', data)
//         socket.nsp.to(data.conversationId).emit('recive_message', data)
//     })

//     //when deisconnect
//     socket.on('disconnect', () => {
//         console.log('a user disconnection')
//         removeUser(socket.id);
//         socket.emit('getUsers', users)
//     })
// })

// server.listen(PORT, () => {
//     console.log(`Socket run on Port ${PORT}`)
// })

