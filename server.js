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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/game', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/bundle.js', function(req, res){
    res.sendFile(__dirname + '/bundle.js');
});


// -----------------------------------
//  Chat & Game Server Data
// -----------------------------------
function ChatGameServer() {
    this.connections = [];
    this.sockets = {};
    this.onlineCnt = 0;
}

ChatGameServer.prototype = {
    init: function() {

    },
    addConnection: function(connection) {
        var idx = this.connections.findIndex(function (conn) { return conn.socketID === connection.socket.id });

        var user = {name:connection.name, sex:connection.sex, socketID:connection.socketID};
        if (idx === -1) {
            this.connections.push(user);
        } else {
            this.connections[idx] = user;
        }
        this.sockets[connection.socket.id] = connection.socket;
    },
    removeConnection: function(id) {
        var idx = this.connections.findIndex(function (conn) { return conn.socketID === id });
        var name = '';
        var sex = '';
        if (idx > -1) {
            var connection = this.connections[idx];
            name = connection.name;
            sex = connection.sex;
            let socket = this.sockets[connection.socketID];
            socket.disconnect();
            this.connections.splice(idx, 1);
        }
        return {name, sex};
    },
    getConnections: function() {
        return {
            connections: this.connections,
            onlineCnt: this.connections.length
        };
    },
    getUserByID: function (id) {
        const idx = this.connections.findIndex(function (conn) { return conn.socketID === id });
        return this.connections[idx];
    }
};

var chat = new ChatGameServer();
chat.init();


// -----------------------------------
//  Socket.io
// -----------------------------------
function getCurentDateTime() {
    var now = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return formatDate = mS[now.getMonth()] + ", " + now.getDate() + " - " + days[now.getDay()] + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

io.on('connection', function(socket){
    socket.once('disconnect', function(){
        let userParams = chat.removeConnection(socket.id);
        let name = userParams.name;
        let sex = userParams.sex;
        // io.emit('receive-message',
        //     {
        //         body: 'disconnect '+name+' ('+sex+')',
        //         date: getCurentDateTime(),
        //         user: name
        //     });
        //io.emit('updateConnection', chat.getConnections());
    });

    socket.on('join', function (userParams) {
        var name = userParams.name;
        var sex = userParams.sex;
        var socketID = socket.id;
        // io.emit('receive-message',{
        //     body: 'connect '+name+' ('+sex+')',
        //     date: getCurentDateTime(),
        //     user: name
        // });
        chat.addConnection({ socket, name, sex, socketID });
        io.emit('updateConnection', chat.getConnections());
    });

    socket.on('new-message', function(msg){
        io.emit('receive-message',msg);
    });

    socket.on('request-game', (param) => {
        const opponent = param.player2;
        const msg = {
            id: param.player1,
            name: chat.getUserByID(param.player1).name
        };
        socket.to(opponent).emit('accept-game', msg);
    });

    socket.on('accept-game', (param) => {
        const opponent = param.player2;
        const msg1 = {
            id: param.player1,
            name: chat.getUserByID(param.player1).name
        };
        const msg2 = {
            id: param.player2,
            name: chat.getUserByID(param.player2).name
        };
        io.to(socket.id).emit('start-game', msg2);
        socket.to(opponent).emit('start-game', msg1);
    });

    socket.on('cancel-game', (param) => {
        const opponent = param.player2;
        io.to(socket.id).emit('cancel-game');
        socket.to(opponent).emit('cancel-game');
    });
});

server.listen(port, function(){
    console.log('listening on *:3000');
});
