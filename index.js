// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

var App = React.createClass({
    getInitialState: function () {
        return {
            messages: [],
            socket: io('http://localhost:3000'),
            user: undefined
        }
    },
    componentDidMount: function () {
        var self = this;
        this.state.socket.on("receive-message", function (msg) {
            //console.log(msg);
            var messages = self.state.messages;
                messages.push(msg);
            self.setState({messages: messages})
        });
    },
    submitMessage: function () {
        var body = document.getElementById("message").value;
        var message = {
            body: body,
            user: this.state.user || "guest"
        };
        this.state.socket.emit("new-message",message);
    },
    pickUser: function () {
        var user = document.getElementById('user').value;
        this.setState({user: user});
    },
    render: function () {
        var self = this;
        console.dir(this.state.messages);
        var messages = this.state.messages.map(function (msg,index) {
            return (
                <li key={index}><strong>{msg.user}:</strong> <span>{msg.body}</span></li>
            )
        });
        return(
            <div className="app">
                <ul id="messages">{messages}</ul>
                {/*<form action="">*/}
                    <input type="text" id="message" autocomplete="off"/>
                    <button onClick={() => self.submitMessage()}>Send</button>
                <input type="text" id="user" placeholder="User name"/>
                <button onClick={()=> self.pickUser()}>Select user</button>
                {/*</form>*/}
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
        document.getElementById('root')
);