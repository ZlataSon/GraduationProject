import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <p>Main page</p>
                {this.props.children}
            </div>
        )
    }
}