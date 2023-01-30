const express = require("express");
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


// const fileAdd = __dirname + "/index.html";
// console.log(fileAdd);
app.use(express.static(__dirname + '/public'))

http.listen(PORT, () => {
    console.log(`listening on part ${PORT}`);
})


// socket 
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('connection...');
    socket.on('message', (msg) => {
        // console.log(msg)
        socket.broadcast.emit('message', msg)
    })
})