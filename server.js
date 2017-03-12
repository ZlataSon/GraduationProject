var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var http = require('http');

var server = http.createServer(app);
var io = require('socket.io')(server);

var port = '3000';
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('./client'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('new-message', function(msg){
        console.log(msg);
        io.emit('receive-message',msg);
    });
    socket.on('test', function(){
        console.log('Test message');
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

server.listen(port, function(){
    console.log('listening on *:3000');
});
