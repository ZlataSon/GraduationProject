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
}

ChatGameServer.prototype = {
    init: function() {

    },
    addConnection: function(connection) {
        var idx = this.connections.findIndex(function (conn) { return conn.socket.id === connection.socket.id });

        if (idx === -1) {
            this.connections.push(connection);
        } else {
            this.connections[idx] = connection;
        }
    },
    removeConnection: function(id) {
        var idx = this.connections.findIndex(function (conn) { return conn.socket.id === id });
        var user = '';
        var sex = '';
        if (idx > -1) {
            var connection = this.connections[idx];
            user = connection.name
            sex = connection.sex;
            connection.socket.disconnect();
            this.connections.splice(idx, 1);
        }
        return {user, sex};
    },
    getConnections: function() {
        return {
            connections: this.connections,
            onlineCnt: this.connections.length
        };
    },
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
        io.emit('receive-message',
            {
                body: 'disconnect '+name+' ('+sex+')',
                date: getCurentDateTime(),
                user: name
            });
        //io.emit('updateConnection', chat.getConnections());
    });

    socket.on('join', function (userParams) {
        var name = userParams.name;
        var sex = userParams.sex;
        io.emit('receive-message',{
            body: 'connect '+name+' ('+sex+')',
            date: getCurentDateTime(),
            user: name
        });
        chat.addConnection({ socket, name, sex });
        //io.emit('updateConnection', chat.getConnections());
    });

    socket.on('new-message', function(msg){
        io.emit('receive-message',msg);
    });

});

server.listen(port, function(){
    console.log('listening on *:3000');
});
