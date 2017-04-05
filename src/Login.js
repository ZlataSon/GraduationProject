import React, { Component } from 'react'

export default class Login extends Component {
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
                        <input type="text" placeholder="Enter nickname and age"/>

                        <div id="mainselection">
                            <select>
                                <option>&#9794; Male or &#9792; Female</option>
                                <option>&#9794; Male</option>
                                <option>&#9792; Female</option>
                            </select>
                        </div>

                        <button>Log In</button>
                    </div>

                </aside>
                <section> </section>
            </main>
        )
    }
}