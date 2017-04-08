import React from 'react';
import { browserHistory } from 'react-router'
// import 'https://afeld.github.io/emoji-css/emoji.css';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            smilebox: false,
            messages: [],
            socket: this.props.socket,
            name: '',
            sex: '',
            connections:[]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        this.state.socket.on("receive-message", (msg) => {
            var messages = this.state.messages;
            messages.push(msg);
            this.setState({messages: messages})
        });
    }
    componentWillReceiveProps (props) {
        this.setState({
            name: props.user.name,
            sex: props.user.sex,
            connections : props.connections
        });
    }
    submitMessage() {
        const body = document.getElementById("message").value;
        const now = new Date();
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        const formatDate = mS[now.getMonth()] + ", " + now.getDate() + " - " + days[now.getDay()] + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        const message = {
            body: body,
            date: formatDate,
            name: this.state.name || "guest",
            sex: this.state.sex,
            socketID: this.state.socket.id
        };
        console.log('send Message');
        console.dir(message);
        this.state.socket.emit("new-message",message);
        document.getElementById("message").value = "";
        return false;
    }
    pressIcon(icon) {
        const text = document.getElementById("message").value;
        document.getElementById("message").value = text + ' //'+icon+'// ';
    }


    parseText(text) {
        const newText = text.replace(new RegExp('//em-eyes//','g'),`<i class='em em-eyes'> </i>`)
            .replace(new RegExp('//em-kiss//','g'),`<i class='em em-kiss'> </i>`)
            .replace(new RegExp('//em---1//','g'),`<i class='em em---1'> </i>`)
            .replace(new RegExp('//em--1//','g'),`<i class='em em--1'> </i>`)
            .replace(new RegExp('//em-hand//','g'),`<i class='em em-hand'> </i>`)
            .replace(new RegExp('//em-clap//','g'),`<i class='em em-clap'> </i>`)
            .replace(new RegExp('//em-facepunch//','g'),`<i class='em em-facepunch'> </i>`)
            .replace(new RegExp('//em-blue_heart//','g'),`<i class='em em-blue_heart'> </i>`)
            .replace(new RegExp('//em-broken_heart//','g'),`<i class='em em-broken_heart'> </i>`)
            .replace(new RegExp('//em-gift_heart//','g'),`<i class='em em-gift_heart'> </i>`)
            .replace(new RegExp('//em-revolving_hearts//','g'),`<i class='em em-revolving_hearts'> </i>`)
            .replace(new RegExp('//em-cupid//','g'),`<i class='em em-cupid'> </i>`)
            .replace(new RegExp('//em-four_leaf_clover//','g'),`<i class='em em-four_leaf_clover'> </i>`)
            .replace(new RegExp('//em-love_letter//','g'),`<i class='em em-love_letter'> </i>`)
            .replace(new RegExp('//em-lipstick//','g'),`<i class='em em-lipstick'> </i>`)
            .replace(new RegExp('//em-underage//','g'),`<i class='em em-underage'> </i>`)
            .replace(new RegExp('//em-zzz//','g'),`<i class='em em-zzz'> </i>`)

            .replace(new RegExp('//em-grinning//','g'),`<i class='em em-grinning'> </i>`)
            .replace(new RegExp('//em-yum//','g'),`<i class='em em-yum'> </i>`)
            .replace(new RegExp('//em-sunglasses//','g'),`<i class='em em-sunglasses'> </i>`)
            .replace(new RegExp('//em-blush//','g'),`<i class='em em-blush'> </i>`)
            .replace(new RegExp('//em-flushed//','g'),`<i class='em em-flushed'> </i>`)
            .replace(new RegExp('//em-heart_eyes//','g'),`<i class='em em-heart_eyes'> </i>`)
            .replace(new RegExp('//em-kissing_closed_eyes//','g'),`<i class='em em-kissing_closed_eyes'> </i>`)
            .replace(new RegExp('//em-pensive//','g'),`<i class='em em-pensive'> </i>`)
            .replace(new RegExp('//em-angry//','g'),`<i class='em em-angry'> </i>`)
            .replace(new RegExp('//em-joy//','g'),`<i class='em em-joy'> </i>`)
            .replace(new RegExp('//em-anguished//','g'),`<i class='em em-anguished'> </i>`)
            .replace(new RegExp('//em-sweat//','g'),`<i class='em em-sweat'> </i>`)
            .replace(new RegExp('//em-stuck_out_tongue//','g'),`<i class='em em-stuck_out_tongue'> </i>`)
            .replace(new RegExp('//em-astonished//','g'),`<i class='em em-astonished'> </i>`)
            .replace(new RegExp('//em-cold_sweat//','g'),`<i class='em em-cold_sweat'> </i>`)
            .replace(new RegExp('//em-scream//','g'),`<i class='em em-scream'> </i>`)
            .replace(new RegExp('//em-confused//','g'),`<i class='em em-confused'> </i>`)
            .replace(new RegExp('//em-innocent//','g'),`<i class='em em-innocent'> </i>`)
            .replace(new RegExp('//em-confounded//','g'),`<i class='em em-confounded'> </i>`)
            .replace(new RegExp('//em-cry//','g'),`<i class='em em-cry'> </i>`)
            .replace(new RegExp('//em-sleeping//','g'),`<i class='em em-sleeping'> </i>`)
            .replace(new RegExp('//em-fearful//','g'),`<i class='em em-fearful'> </i>`)
            .replace(new RegExp('//em-dizzy_face//','g'),`<i class='em em-dizzy_face'> </i>`)
            .replace(new RegExp('//em-disappointed//','g'),`<i class='em em-disappointed'> </i>`)
            .replace(new RegExp('//em-disappointed_relieved//','g'),`<i class='em em-disappointed_relieved'> </i>`)
            .replace(new RegExp('//em-expressionless//','g'),`<i class='em em-expressionless'> </i>`)
            .replace(new RegExp('//em-smiling_imp//','g'),`<i class='em em-smiling_imp'> </i>`)
            .replace(new RegExp('//em-triumph//','g'),`<i class='em em-triumph'> </i>`)

            .replace(new RegExp('//em-birthday//','g'),`<i class='em em-birthday'> </i>`)
            .replace(new RegExp('//em-gem//','g'),`<i class='em em-gem'> </i>`)
            .replace(new RegExp('//em-bouquet//','g'),`<i class='em em-bouquet'> </i>`)
            .replace(new RegExp('//em-cherry_blossom//','g'),`<i class='em em-cherry_blossom'> </i>`)
            .replace(new RegExp('//em-candy//','g'),`<i class='em em-candy'> </i>`)
            .replace(new RegExp('//em-beers//','g'),`<i class='em em-beers'> </i>`)
            .replace(new RegExp('//em-coffee//','g'),`<i class='em em-coffee'> </i>`)
            .replace(new RegExp('//em-rose//','g'),`<i class='em em-rose'> </i>`)
            .replace(new RegExp('//em-hamburger//','g'),`<i class='em em-hamburger'> </i>`)
            .replace(new RegExp('//em-strawberry//','g'),`<i class='em em-strawberry'> </i>`)
            .replace(new RegExp('//em-peach//','g'),`<i class='em em-peach'> </i>`)
            .replace(new RegExp('//em-stew//','g'),`<i class='em em-stew'> </i>`)
            .replace(new RegExp('//em-tropical_drink//','g'),`<i class='em em-tropical_drink'> </i>`)
            .replace(new RegExp('//em-wine_glass//','g'),`<i class='em em-wine_glass'> </i>`)
            .replace(new RegExp('//em-shaved_ice//','g'),`<i class='em em-shaved_ice'> </i>`)

            .replace(new RegExp('//em-christmas_tree//','g'),`<i class='em em-christmas_tree'> </i>`);
        return {__html: newText};
    }
    viewSmileBox() {
        this.setState({smilebox: !this.state.smilebox});
    }
    pickUser() {
        const user = document.getElementById('user').value;
        this.setState({name: user});
    }
    playGame(socketID) {
        console.log('press playGame');
        //console.dir(event.tar);
        console.dir(socketID);
        // console.dir(noName);
        // console.dir(arguments);
        //const socketID = event.target.value;
        //const mySocketID = this.state.socket.id;
        const path = `/game/${socketID}`;
        browserHistory.push(path);

    }
    handleChange(event) {
        this.setState({name: event.target.value});
    }
    render() {
        const self = this;
        const messages = this.state.messages.map(function (msg,index) {
            console.log('out put message');
            console.dir(msg);
            return (

                <li key={index}>
                    <p className="msg-title">
                        <img src="../img/girl_icon_chart.png" alt=""/>
                        <strong>{msg.name}: </strong>
                        <span>
                            <a className="button sm-button" href="javascript:void(0)">
                                <i className="fa fa-weixin" aria-hidden="true"> </i>
                            </a>
                            <a className="button sm-button" href="javascript:void(0)" onClick={self.playGame.bind(self,msg.socketID)}>
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
                    <h1>Water chat</h1>
                    <input type="text" id="user" placeholder="Change your Nickname" value={self.state.name} onChange={this.handleChange}/>
                    <a className="button" href="javascript:void(0)" onClick={()=> self.pickUser()}>
                        <i className="fa fa-floppy-o" aria-hidden="true"> </i>
                    </a>
                </header>

                <main>
                    <ul id="messages">{messages}</ul>
                </main>

                <footer>
                    <div className={"smile-box "+(self.state.smilebox ? 'show' : 'hide')}>
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
                        <i className="em em-gem" onClick={()=> self.pressIcon("em-gem")}> </i>
                        <i className="em em-cherry_blossom" onClick={()=> self.pressIcon("em-cherry_blossom")}> </i>
                        <i className="em em-candy" onClick={()=> self.pressIcon("em-candy")}> </i>
                        <i className="em em-beers" onClick={()=> self.pressIcon("em-beers")}> </i>
                        <i className="em em-coffee" onClick={()=> self.pressIcon("em-coffee")}> </i>
                        <i className="em em-rose" onClick={()=> self.pressIcon("em-rose")}> </i>
                        <i className="em em-hamburger" onClick={()=> self.pressIcon("em-hamburger")}> </i>
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
                        <i className="em em-christmas_tree" onClick={()=> self.pressIcon("em-christmas_tree")}> </i>
                    </div>
                    <textarea id="message" autoComplete="off"/>
                    <a className="button" href="javascript:void(0)" onClick={() => self.submitMessage()}>
                        <i className="fa fa-paper-plane" aria-hidden="true"> </i>
                    </a>
                    <a className="button smile" href="javascript:void(0)" onClick={() => self.viewSmileBox()} >
                        <i className="fa fa-smile-o" aria-hidden="true"> </i>
                    </a>

                </footer>
            </div>
        )
    }
};

export default Chat;
