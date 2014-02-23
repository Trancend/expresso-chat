var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.use(express.static('./web'));

var sockets = [];

io.sockets.on('connection', function (socket) {

  sockets.push(socket);

  socket.on('message:send', function (data) {
    sockets.forEach(function (socket) {
      socket.emit('message:receive', data);
    });
    console.log('RECEIVED A MESSAGE: ' + data.message);
  });

  socket.on('disconnect', function () {
    sockets.splice(sockets.indexOf(socket), 1);
  });
});