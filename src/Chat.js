import React from 'react';
// import 'https://afeld.github.io/emoji-css/emoji.css';

var Chat = React.createClass({
    getInitialState: function () {

        return {
            smilebox: false,
            messages: [],
            socket: this.props.socket,
            user: undefined
        }
    },
    componentDidMount: function () {
        var self = this;
        this.state.socket.on("receive-message", function (msg) {
            var messages = self.state.messages;
            messages.push(msg);
            self.setState({messages: messages})
        });
    },
    submitMessage: function () {
        var body = document.getElementById("message").value;
        var now = new Date();
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var formatDate = mS[now.getMonth()] + ", " + now.getDate() + " - " + days[now.getDay()] + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        var message = {
            body: body,
            date: formatDate,
            user: this.state.user || "guest"
        };
        this.state.socket.emit("new-message",message);
        document.getElementById("message").value = "";
        return false;
    },
    pressIcon: function (icon) {
        let text = document.getElementById("message").value;
        document.getElementById("message").value = text + ' //'+icon+'// ';
    },
    parseText: function (text) {
        let newText = text.replace(new RegExp('//em-eyes//','g'),`<i class='em em-eyes'> </i>`)
            .replace(new RegExp('//em-eyes//','g'),`<i class='em em-eyes'> </i>`);
        return {__html: newText};
    },
    viewSmilebox: function () {
        this.setState({smilebox: !this.state.smilebox});
    },
    pickUser: function () {
        var user = document.getElementById('user').value;
        this.setState({user: user});
    },
    playGame: function () {

    },
    render: function () {
        var self = this;
        var messages = this.state.messages.map(function (msg,index) {
            return (

                <li key={index}>
                    <p className="msg-title">
                        <img src="../img/girl_icon_chart.png" alt=""/>
                        <strong>{msg.user}: </strong>
                        <span>
                            <a className="button sm-button" href="javascript:void(0)">
                                <i className="fa fa-weixin" aria-hidden="true"> </i>
                            </a>
                            <a className="button sm-button" href="/game" >
                                <i className="fa fa-gamepad" aria-hidden="true"> </i>
                            </a>
                        </span>
                        <span className="date">{msg.date}</span>
                    </p>

                    <div className="msg-body">
                        <i className="fa fa-quote-left" aria-hidden="true"> </i>
                        {/*{self.parseText(msg.body)}>*/}
                        <div dangerouslySetInnerHTML={self.parseText(msg.body)} />
                        <i className="fa fa-quote-right" aria-hidden="true"> </i>
                    </div>
                </li>
            )
        });
        return(
            <div className="app public">
                <header>
                    <input type="text" id="user" placeholder="User name"/>
                    <a className="button" href="javascript:void(0)" onClick={()=> self.pickUser()}>
                        <i className="fa fa-pencil" aria-hidden="true"> </i>
                        {/*<i className="fa fa-floppy-o" aria-hidden="true"> </i>*/}
                    </a>
                </header>

                <main>
                    <ul id="messages">{messages}</ul>
                </main>

                <footer>
                    <div className={"smile-box "+(this.state.smilebox ? 'show' : 'hide')}>
                        <i className="em em-eyes" onClick={()=> self.pressIcon("em-eyes")}> </i>
                        <i className="em em-kiss" onClick={()=> self.pressIcon("em-kiss")}> </i>
                        <i className="em em---1" onClick={()=> self.pressIcon("em---1")}> </i>
                        <i className="em em--1" onClick={()=> self.pressIcon("em--1")}> </i>
                        <i className="em em-hand" onClick={()=> self.pressIcon("em-hand")}> </i>
                        <i className="em em-clap" onClick={()=> self.pressIcon("em-clap")}> </i>
                        <i className="em em-facepunch" onClick={()=> self.pressIcon("em-facepunch")}> </i>
                        <i className="em em-blue_heart" onClick={()=> self.pressIcon("em-blue_heart")}> </i>
                        <i className="em em-broken_heart" onClick={()=> self.pressIcon("em-broken_heart")}> </i>
                        <i className="em em-gift_heart" onClick={()=> self.pressIcon("em-gift_heart")}> </i>
                        <i className="em em-revolving_hearts" onClick={()=> self.pressIcon("em-revolving_hearts")}> </i>
                        <i className="em em-cupid" onClick={()=> self.pressIcon("em-cupid")}> </i>
                        <i className="em em-four_leaf_clover" onClick={()=> self.pressIcon("em-four_leaf_clover")}> </i>
                        <i className="em em-love_letter" onClick={()=> self.pressIcon("em-love_letter")}> </i>
                        <i className="em em-lipstick" onClick={()=> self.pressIcon("em-lipstick")}> </i>
                        <i className="em em-underage" onClick={()=> self.pressIcon("em-underage")}> </i>
                        <i className="em em-zzz" onClick={()=> self.pressIcon("em-zzz")}> </i>
                        <hr/>

                        <i className="em em-grinning" onClick={()=> self.pressIcon("em-grinning")}> </i>
                        <i className="em em-yum" onClick={()=> self.pressIcon("em-yum")}> </i>
                        <i className="em em-sunglasses" onClick={()=> self.pressIcon("em-sunglasses")}> </i>
                        <i className="em em-blush" onClick={()=> self.pressIcon("em-blush")}> </i>
                        <i className="em em-flushed" onClick={()=> self.pressIcon("em-flushed")}> </i>
                        <i className="em em-heart_eyes" onClick={()=> self.pressIcon("em-heart_eyes")}> </i>
                        <i className="em em-kissing_closed_eyes" onClick={()=> self.pressIcon("em-kissing_closed_eyes")}> </i>
                        <i className="em em-pensive" onClick={()=> self.pressIcon("em-pensive")}> </i>
                        <i className="em em-angry" onClick={()=> self.pressIcon("em-angry")}> </i>
                        <i className="em em-joy" onClick={()=> self.pressIcon("em-joy")}> </i>
                        <i className="em em-anguished" onClick={()=> self.pressIcon("em-anguished")}> </i>
                        <i className="em em-sweat" onClick={()=> self.pressIcon("em-sweat")}> </i>
                        <i className="em em-stuck_out_tongue" onClick={()=> self.pressIcon("em-stuck_out_tongue")}> </i>
                        <i className="em em-astonished" onClick={()=> self.pressIcon("em-astonished")}> </i>
                        <i className="em em-cold_sweat" onClick={()=> self.pressIcon("em-cold_sweat")}> </i>
                        <i className="em em-scream" onClick={()=> self.pressIcon("em-scream")}> </i>
                        <i className="em em-confused" onClick={()=> self.pressIcon("em-confused")}> </i>
                        <i className="em em-innocent" onClick={()=> self.pressIcon("em-innocent")}> </i>
                        <i className="em em-confounded" onClick={()=> self.pressIcon("em-confounded")}> </i>
                        <i className="em em-cry" onClick={()=> self.pressIcon("em-cry")}> </i>
                        <i className="em em-sleeping" onClick={()=> self.pressIcon("em-sleeping")}> </i>
                        <i className="em em-fearful" onClick={()=> self.pressIcon("em-fearful")}> </i>
                        <i className="em em-dizzy_face" onClick={()=> self.pressIcon("em-dizzy_face")}> </i>
                        <i className="em em-disappointed" onClick={()=> self.pressIcon("em-disappointed")}> </i>
                        <i className="em em-disappointed_relieved" onClick={()=> self.pressIcon("em-disappointed_relieved")}> </i>
                        <i className="em em-expressionless" onClick={()=> self.pressIcon("em-expressionless")}> </i>
                        <i className="em em-smiling_imp" onClick={()=> self.pressIcon("em-smiling_imp")}> </i>
                        <i className="em em-triumph" onClick={()=> self.pressIcon("em-triumph")}> </i>
                        <hr/>

                        <i className="em em-birthday" onClick={()=> self.pressIcon("em-birthday")}> </i>
                        <i className="em em-bouquet" onClick={()=> self.pressIcon("em-bouquet")}> </i>
                        <i className="em em-cherry_blossom" onClick={()=> self.pressIcon("em-cherry_blossom")}> </i>
                        <i className="em em-candy" onClick={()=> self.pressIcon("em-candy")}> </i>
                        <i className="em em-beers" onClick={()=> self.pressIcon("em-beers")}> </i>
                        <i className="em em-coffee" onClick={()=> self.pressIcon("em-coffee")}> </i>
                        <i className="em em-rose" onClick={()=> self.pressIcon("em-rose")}> </i>
                        <i className="em em-hamburger" onClick={()=> self.pressIcon("em-hamburger")}> </i>
                        <i className="em em-christmas_tree" onClick={()=> self.pressIcon("em-christmas_tree")}> </i>
                        <i className="em em-gem" onClick={()=> self.pressIcon("em-gem")}> </i>
                        <i className="em em-strawberry" onClick={()=> self.pressIcon("em-strawberry")}> </i>
                        <i className="em em-peach" onClick={()=> self.pressIcon("em-peach")}> </i>
                        <i className="em em-stew" onClick={()=> self.pressIcon("em-stew")}> </i>
                        <i className="em em-tropical_drink" onClick={()=> self.pressIcon("em-tropical_drink")}> </i>
                        <i className="em em-wine_glass" onClick={()=> self.pressIcon("em-wine_glass")}> </i>
                        <i className="em em-shaved_ice" onClick={()=> self.pressIcon("em-shaved_ice")}> </i>

                        <hr/>
                        <i className="em em-partly_sunny" onClick={()=> self.pressIcon("em-partly_sunny")}> </i>
                        <i className="em em-palm_tree" onClick={()=> self.pressIcon("em-palm_tree")}> </i>
                        <i className="em em-snowflake" onClick={()=> self.pressIcon("em-snowflake")}> </i>
                        <i className="em em-umbrella" onClick={()=> self.pressIcon("em-umbrella")}> </i>
                        <i className="em em-art" onClick={()=> self.pressIcon("em-art")}> </i>
                        <i className="em em-basketball" onClick={()=> self.pressIcon("em-basketball")}> </i>
                        <i className="em em-bike" onClick={()=> self.pressIcon("em-bike")}> </i>
                        <i className="em em-soccer" onClick={()=> self.pressIcon("em-soccer")}> </i>
                        <i className="em em-bikini" onClick={()=> self.pressIcon("em-bikini")}> </i>
                        <i className="em em-boat" onClick={()=> self.pressIcon("em-boat")}> </i>
                        <i className="em em-swimmer" onClick={()=> self.pressIcon("em-swimmer")}> </i>
                        <i className="em em-books" onClick={()=> self.pressIcon("em-books")}> </i>
                        <i className="em em-briefcase" onClick={()=> self.pressIcon("em-briefcase")}> </i>
                        <i className="em em-shower" onClick={()=> self.pressIcon("em-shower")}>  </i>
                        <i className="em em-cat2" onClick={()=> self.pressIcon("em-cat2")}> </i>
                        <i className="em em-circus_tent" onClick={()=> self.pressIcon("em-circus_tent")}> </i>
                        <i className="em em-computer" onClick={()=> self.pressIcon("em-computer")}> </i>
                        <i className="em em-crystal_ball" onClick={()=> self.pressIcon("em-crystal_ball")}> </i>
                        <i className="em em-fishing_pole_and_fish" onClick={()=> self.pressIcon("em-fishing_pole_and_fish")}> </i>
                        <i className="em em-guitar" onClick={()=> self.pressIcon("em-guitar")}> </i>
                        <i className="em em-performing_arts" onClick={()=> self.pressIcon("em-performing_arts")}> </i>
                    </div>
                    <input type="text" id="message" autoComplete="off"/>
                    <a className="button" href="javascript:void(0)" onClick={() => self.submitMessage()}>
                        <i className="fa fa-paper-plane" aria-hidden="true"> </i>
                    </a>
                    <a className="button smile" href="javascript:void(0)" onClick={() => self.viewSmilebox()} >
                        <i className="fa fa-smile-o" aria-hidden="true"> </i>
                    </a>

                </footer>
            </div>
        )
    }
});

export default Chat;
