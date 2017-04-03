import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        //this.socket.on('connect', this.connect.bind(this));
    }

    componentWillUnmount() {
        //this.socket.off('connect');
    }

    getCurrentUser() {
        const socketId = this.socket.id;
    }

    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    }

    render() {
        const {children} = this.props;

        var childrenWithProps = React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                emit: this.emit.bind(this),
                user: this.getCurrentUser(),
                socket: this.socket 
            });
        });

        return (
            <div className='container'>
                {/*{this.props.children}*/}
                { childrenWithProps }
            </div>
        )
    }
}