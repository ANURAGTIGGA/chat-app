const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat_msg', (msg)=>{
        console.log('message: ' + msg);
        io.emit('chat_msg', msg);
        //socket.broadcast.emit('chat_msg', msg);
    })

    socket.on('disconnect', ()=>{
        console.log('a user disconnected!');
    })
})


