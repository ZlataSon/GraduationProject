import React from 'react';
import ReactDOM from 'react-dom';
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
        document.getElementById("message").value = "";
        return false;
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
            <div className="app public">
                <header>
                    <input type="text" id="user" placeholder="User name"/>
                    <a className="button" href="javascript:void(0)" onClick={()=> self.pickUser()}>
                        <i className="fa fa-floppy-o" aria-hidden="true"> </i>
                    </a>
                </header>

                <main>
                    <ul id="messages">{messages}</ul>
                </main>

                <footer>
                    <div className="smile-box">
                        <i className="em em-eyes"> </i>
                        <i className="em em-kiss"> </i>
                        <i className="em em---1"> </i>
                        <i className="em em--1"> </i>
                        <i className="em em-hand"> </i>
                        <i className="em em-clap"> </i>
                        <i className="em em-facepunch"> </i>
                        <i className="em em-blue_heart"> </i>
                        <i className="em em-broken_heart"> </i>
                        <i className="em em-gift_heart"> </i>
                        <i className="em em-revolving_hearts"> </i>
                        <i className="em em-cupid"> </i>
                        <i className="em em-four_leaf_clover"> </i>
                        <i className="em em-love_letter"> </i>
                        <i className="em em-lipstick"> </i>
                        <i className="em em-underage"> </i>
                        <i className="em em-zzz"> </i>
                        <hr/>

                        <i className="em em-grinning"> </i>
                        <i className="em em-yum"> </i>
                        <i className="em em-sunglasses"> </i>
                        <i className="em em-blush"> </i>
                        <i className="em em-flushed"> </i>
                        <i className="em em-heart_eyes"> </i>
                        <i className="em em-kissing_closed_eyes"> </i>
                        <i className="em em-pensive"> </i>
                        <i className="em em-angry"> </i>
                        <i className="em em-joy"> </i>
                        <i className="em em-anguished"> </i>
                        <i className="em em-sweat"> </i>
                        <i className="em em-stuck_out_tongue"> </i>
                        <i className="em em-astonished"> </i>
                        <i className="em em-cold_sweat"> </i>
                        <i className="em em-scream"> </i>
                        <i className="em em-confused"> </i>
                        <i className="em em-innocent"> </i>
                        <i className="em em-confounded"> </i>
                        <i className="em em-cry"> </i>
                        <i className="em em-sleeping"> </i>
                        <i className="em em-fearful"> </i>
                        <i className="em em-dizzy_face"> </i>
                        <i className="em em-disappointed"> </i>
                        <i className="em em-disappointed_relieved"> </i>
                        <i className="em em-expressionless"> </i>
                        <i className="em em-smiling_imp"> </i>
                        <i className="em em-triumph"> </i>
                        <hr/>

                        <i className="em em-birthday"> </i>
                        <i className="em em-bouquet"> </i>
                        <i className="em em-cherry_blossom"> </i>
                        <i className="em em-candy"> </i>
                        <i className="em em-beers"> </i>
                        <i className="em em-coffee"> </i>
                        <i className="em em-rose"> </i>
                        <i className="em em-hamburger"> </i>
                        <i className="em em-christmas_tree"> </i>
                        <i className="em em-gem"> </i>
                        <i className="em em-strawberry"> </i>
                        <i className="em em-peach"> </i>
                        <i className="em em-stew"> </i>
                        <i className="em em-tropical_drink"> </i>
                        <i className="em em-wine_glass"> </i>
                        <i className="em em-shaved_ice"> </i>

                        <hr/>
                        <i className="em em-partly_sunny"> </i>
                        <i className="em em-palm_tree"> </i>
                        <i className="em em-snowflake"> </i>
                        <i className="em em-umbrella"> </i>
                        <i className="em em-art"> </i>
                        <i className="em em-basketball"> </i>
                        <i className="em em-bike"> </i>
                        <i className="em em-soccer"> </i>
                        <i className="em em-bikini"> </i>
                        <i className="em em-boat"> </i>
                        <i className="em em-swimmer"> </i>
                        <i className="em em-books"> </i>
                        <i className="em em-briefcase"> </i>
                        <i className="em em-shower">  </i>
                        <i className="em em-cat2"> </i>
                        <i className="em em-circus_tent"> </i>
                        <i className="em em-computer"> </i>
                        <i className="em em-crystal_ball"> </i>
                        <i className="em em-fishing_pole_and_fish"> </i>
                        <i className="em em-guitar"> </i>
                        <i className="em em-performing_arts"> </i>
                    </div>
                    <input type="text" id="message" autoComplete="off"/>
                    <a className="button" href="javascript:void(0)" onClick={() => self.submitMessage()}>
                        <i className="fa fa-paper-plane" aria-hidden="true"> </i>
                    </a>
                    <a className="button smile" href="javascript:void(0)" >
                        <i className="fa fa-smile-o" aria-hidden="true"> </i>
                    </a>

                </footer>
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
        document.getElementById('root')
);