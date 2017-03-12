// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

var App = React.createClass({
    getInitialState: function () {
        return {
            messages: [],
            socket: io('http://localhost:3000')
        }
    },
    componentDidMount: function () {
        this.state.socket.emit('test');
    },
    render: function () {
        return(
            <div>
                Hello
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
        document.getElementById('root')
);