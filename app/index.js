const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express()
const port = 3000
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);

      // to emit to all sockets
      // io.emit('chat message', msg);

      // to emit to all sockets excluding itself
      socket.broadcast.emit(msg);
    });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
