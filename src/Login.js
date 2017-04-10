import React, { Component } from 'react'
import {browserHistory} from 'react-router';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    componentWillMount() {
        if (window.performance.navigation.type == 1) {
            browserHistory.push('/');
        }
    }
    login() {
        const {emit} = this.props;
        if (emit) {
            emit('join', {
                name: this.refs.refName.value,
                sex: this.refs.refSex.value
            });
        }
        browserHistory.push('chat');
    }

    render() {
        return (
            <main className="login">
                <aside>
                    <h1>Water chat</h1>
                    <p className="description">-  online speaking chat with game "Five in line"</p>
                    <h3>By
                        <a href="https://github.com/ZlataSon">Zlata Son</a>
                        <span> & </span>
                        <a href="https://github.com/EvgenSalyakin">Evgen S.</a>
                    </h3>

                    <div className="login-form">
                        <input type="text" ref="refName" placeholder="Enter nickname and age"/>

                        {/*<input type="text" placeholder="Enter your age"/>*/}

                        <div id="mainselection">
                            <select ref="refSex">
                                <option>&#9794; Male or &#9792; Female</option>
                                <option>&#9794; Male</option>
                                <option>&#9792; Female</option>
                            </select>
                        </div>

                        <button onClick={this.login}>Log In</button>
                    </div>

                </aside>
                <section> </section>
            </main>
        )
    }
}