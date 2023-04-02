const app = require("./routers/router");
const http = require('http');
require("./DB/DB");
require('./Socket')
const express = require('express');

const server = http.createServer(app);
const io = require('socket.io')(server)
const PORT = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const path = require("path");

// connectDB();
app.use(express.static(path.join(__dirname, 'public')));

// Added to serve client static files
app.use(express.static(path.resolve(__dirname, 'client/build')));
//DEPLOYMENT
if (process.env.NODE_ENV === "production") {
  // const root = path.join(__dirname, "/client/build");
  // app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname , 'client','build','index.html'));
  });
};

io.on("connection", (socket) => {


  socket.on('Open_Chat', (conversation) => {
      console.log('conversation',conversation)
      conversation.map(conver => {
          console.log('open room for', conver._id)
          socket.join(conver._id)
      })


  })

  socket.on('send_message', (data) => {
      console.log('send_message', data)
      socket.nsp.to(data.conversationId).emit('recive_message', data)
  })

  //when deisconnect
  socket.on('disconnect', () => {
      console.log('a user disconnection')
      
  })
})


server.listen(PORT, () => {
  console.log(`shut up start on port: ${PORT}`);
});
