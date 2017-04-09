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

function GameServer() {
    this.gameID = '';
    this.player1 = {};
    this.player2 = {};
}

GameServer.prototype = {
    init: function(gID, pl1,pl2) {
        this.gameID = gID;
        this.player1 = pl1;
        this.player2 = pl2;
    },
};

let gameOnServer = {};

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

        let gameID = '';
        do {
            gameID = (Math.random().toString(10) + "000000000000").substr(2, 11);
            var findID = gameOnServer[gameID];
        } while (findID);

        gameOnServer[gameID] = new GameServer();
        gameOnServer[gameID].init(gameID, param.player1, param.player2);

        io.to(socket.id).emit('start-game', gameID);
        socket.to(opponent).emit('start-game', gameID);
    });

    socket.on('cancel-game', (param) => {
        const opponent = param.player2;
        io.to(socket.id).emit('cancel-game');
        socket.to(opponent).emit('cancel-game');
    });

    socket.on('init-game-onclient', (param) => {
        this.game = gameOnServer[param.gameID];
        io.to(socket.id).emit('init-game-onclient',this.game);
    });
    socket.on('move', (param) => {
        if (socket.id == this.game.player1) io.to(this.game.player1).emit('showMove',param);
            else socket.to(this.game.player1).emit('showMove',param);
        if (socket.id == this.game.player2) io.to(this.game.player2).emit('showMove',param);
            else socket.to(this.game.player2).emit('showMove',param);
    });
});

server.listen(port, function(){
    console.log('listening on *:3000');
});
