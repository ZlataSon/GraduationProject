import React, { Component } from 'react'
import io from 'socket.io-client';
import { Link } from 'react-router'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connections: [],
            onlineCnt: 0
        }
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
        this.socket.on('updateConnection', this.updateConnection.bind(this));
    }

    componentWillUnmount() {
        this.socket.off('connect');
        this.socket.off('disconnect');
        this.socket.off('updateConnection');
    }

    getCurrentUser() {

        const {connections} = this.state;
        const socketId = this.socket.id;

        let connectionIndex = -1;
        if (connections.length > 0) {
            connectionIndex = connections.findIndex(connection => {
                return connection.socketID === socketId
            });
        }

        if (connectionIndex < 0) {
            return {
                name: '',
                sex: ''
            };
        }

        const connection = connections[connectionIndex];

        return {
            name: connection.name,
            sex: connection.sex
        };
    }

    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    }

    connect() {

    }

    disconnect() {

    }

    updateConnection(Connections) {
        console.log('updateConection');
        const { connections, onlineCnt} = Connections;

        this.setState({
            connections,
            onlineCnt
        });
    }

    render() {

        const {children} = this.props;
        const {connections, onlineCnt} = this.state;
        console.log('Render App');
        console.dir(connections);
        var childrenWithProps = React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                emit: this.emit.bind(this),
                user: this.getCurrentUser(),
                socket: this.socket,
                connections,
                onlineCnt
            });
        });

        return (
            <div className='container'>
                 { childrenWithProps }
            </div>
        )
    }
}