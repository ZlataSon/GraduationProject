import React from 'react';
import { browserHistory } from 'react-router';
// import 'https://afeld.github.io/emoji-css/emoji.css';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            smilebox: false,
            messages: [],
            socket: props.socket,
            name: props.user.name,
            sex: props.user.sex,
            connections:props.connections,
            gameInvite:{status:'', opponent:'', opponentID:''}
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        this.state.socket.on("receive-message", (msg) => {
            const messages = this.state.messages;
            messages.push(msg);
            this.setState({messages: messages});
        });
        this.state.socket.on("accept-game", (msg) => {
            this.setState({gameInvite: {status:'recive', opponent:msg.name, opponentID:msg.id }});
        });
        this.state.socket.on("cancel-game", () => {
            this.setState({gameInvite: {status:'', opponent:'', opponentID:''}});
        });
        this.state.socket.on("start-game", (gameID) => {
            console.log('receive Start game');
            const path = `/game/${gameID}`;
            browserHistory.push(path);
            //this.setState({gameInvite: {status:'recive', opponent:msg.name, opponentID:'' }});
        });
    }
    componentWillUnmount() {
        this.state.socket.off("receive-message");
        this.state.socket.off("accept-game");
        this.state.socket.off("cancel-game");
        this.state.socket.off("start-game");
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

    /* Set the width of the side navigation to 300px */
    openNav() {
        document.getElementById("mySidenav").style.width = "300px";
    }

    /* Set the width of the side navigation to 0 */
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
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

            .replace(new RegExp('//em-partly_sunny//','g'),`<i class='em em-partly_sunny'> </i>`)
            .replace(new RegExp('//em-palm_tree//','g'),`<i class='em em-palm_tree'> </i>`)
            .replace(new RegExp('//em-snowflake//','g'),`<i class='em em-snowflake'> </i>`)
            .replace(new RegExp('//em-umbrella//','g'),`<i class='em em-umbrella'> </i>`)
            .replace(new RegExp('//em-art//','g'),`<i class='em em-art'> </i>`)
            .replace(new RegExp('//em-basketball//','g'),`<i class='em em-basketball'> </i>`)
            .replace(new RegExp('//em-bike//','g'),`<i class='em em-bike'> </i>`)
            .replace(new RegExp('//em-soccer//','g'),`<i class='em em-soccer'> </i>`)
            .replace(new RegExp('//em-bikini//','g'),`<i class='em em-bikini'> </i>`)
            .replace(new RegExp('//em-boat//','g'),`<i class='em em-boat'> </i>`)
            .replace(new RegExp('//em-swimmer//','g'),`<i class='em em-swimmer'> </i>`)
            .replace(new RegExp('//em-books//','g'),`<i class='em em-books'> </i>`)
            .replace(new RegExp('//em-briefcase//','g'),`<i class='em em-briefcase'> </i>`)
            .replace(new RegExp('//em-shower//','g'),`<i class='em em-shower'> </i>`)
            .replace(new RegExp('//em-cat2//','g'),`<i class='em em-cat2'> </i>`)
            .replace(new RegExp('//em-circus_tent//','g'),`<i class='em em-circus_tent'> </i>`)
            .replace(new RegExp('//em-computer//','g'),`<i class='em em-computer'> </i>`)
            .replace(new RegExp('//em-crystal_ball//','g'),`<i class='em em-crystal_ball'> </i>`)
            .replace(new RegExp('//em-fishing_pole_and_fish//','g'),`<i class='em em-fishing_pole_and_fish'> </i>`)
            .replace(new RegExp('//em-guitar//','g'),`<i class='em em-guitar'> </i>`)
            .replace(new RegExp('//em-performing_arts//','g'),`<i class='em em-performing_arts'> </i>`)
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
        if (this.state.gameInvite.status != '') return;
        //console.log('press playGame');
        // console.dir(arguments);
        //const socketID = event.target.value;
        //const mySocketID = this.state.socket.id;

        const param = {player1: this.state.socket.id, player2: socketID};
        this.state.socket.emit("request-game",param);

        const idx = this.state.connections.findIndex(function (conn) { return conn.socketID === socketID });
        // console.log('press playGame');
        // console.dir(this.state.connections[idx].name);
        // console.dir(this.state.connections[idx].id);
        // console.dir(this.state.connections);
        this.setState({gameInvite: {
            status:'send',
            opponent:this.state.connections[idx].name,
            opponentID:this.state.connections[idx].socketID
        }});
    }

    acceptGame(socketID) {
        const param = {player1: this.state.socket.id, player2: socketID};
        this.state.socket.emit("accept-game",param);
        //this.setState({gameInvite: {status:'', opponent:'', opponentID:''}});
    }

    cancelGame(socketID) {
        console.log('press cancel Game');
        console.dir(socketID);
        const param = {player1: this.state.socket.id, player2: socketID};
        this.state.socket.emit("cancel-game",param);
        //this.setState({gameInvite: {status:'', opponent:'', opponentID:'' }});
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    render() {
        const messages = this.state.messages.map((msg,index)=> {
            console.log('out put message');
            console.dir(this.state.sex);
            return (

                <li key={index}>
                    <p className="msg-title">
                        {this.state.sex == "♂ Male" ?
                            <img src="../img/boy_icon_chart.png" alt=""/>
                            :
                            this.state.sex == "♀ Female" ?
                                <img src="../img/girl_icon_chart.png" alt=""/>
                                :
                                <img src="../img/admin_icon.gif" alt=""/>
                        }
                        <strong>{msg.name}: </strong>
                        <span>
                            <a className="button sm-button" href="javascript:void(0)" onClick={()=> this.openNav()}>
                                <i className="fa fa-weixin" aria-hidden="true"> </i>
                            </a>
                            <a className="button sm-button" href="javascript:void(0)" onClick={this.playGame.bind(this,msg.socketID)}>
                                <i className="fa fa-gamepad" aria-hidden="true"> </i>
                            </a>
                        </span>
                        <span className="date">{msg.date}</span>
                    </p>

                    <div className="msg-body">
                        <i className="fa fa-quote-left" aria-hidden="true"> </i>
                        {/*{this.parseText(msg.body)}>*/}
                        <div dangerouslySetInnerHTML={this.parseText(msg.body)} />
                        <i className="fa fa-quote-right" aria-hidden="true"> </i>
                    </div>
                </li>
            )
        });

        return(
            <div className="app public">
                <header>
                    <h1>Water chat</h1>
                    <input type="text" id="user" placeholder="Change your Nickname" value={this.state.name} onChange={this.handleChange}/>
                    <a className="button" href="javascript:void(0)" onClick={()=> this.pickUser()}>
                        <i className="fa fa-floppy-o" aria-hidden="true"> </i>
                    </a>
                    {this.state.gameInvite.status=='recive'?
                        <div>
                            <h3>Request on game from {this.state.gameInvite.opponent} ({this.state.gameInvite.opponentID})</h3>
                            <a href="javascript:void(0)" className="button" onClick={this.acceptGame.bind(this,this.state.gameInvite.opponentID)}>Accept</a>
                            <a href="javascript:void(0)" className="button" onClick={this.cancelGame.bind(this,this.state.gameInvite.opponentID)}>Cancel</a>
                        </div>
                        :
                        this.state.gameInvite.status=='send'?
                            <div>
                                <h3>Wait for {this.state.gameInvite.opponent} ({this.state.gameInvite.opponentID})</h3>
                                <a href="javascript:void(0)" className="button" onClick={this.cancelGame.bind(this,this.state.gameInvite.opponentID)}>Cancel</a>
                            </div>
                            :
                            null
                    }
                    <a  href="javascript:void(0)" className="open-private button" onClick={()=> this.openNav()}>Open Private</a>
                </header>

                <main>
                    <ul id="messages">{messages}</ul>

                    <div id="mySidenav" className="sidenav">
                        <header>
                            <a href="javascript:void(0)" className="closebtn" onClick={()=> this.closeNav()}>&times;</a>
                            <div className="mainselection">
                                <select ref="refSex">
                                    <option>Users</option>
                                    <option>NickName</option>
                                    <option>NickName2</option>
                                </select>
                            </div>
                        </header>

                        <footer>
                            <textarea id="messagePrivat" autoComplete="off"/>
                            <a className="button" href="javascript:void(0)" onClick={() => this.submitMessage()}>
                                <i className="fa fa-paper-plane" aria-hidden="true"> </i>
                            </a>
                            <a className="button smile" href="javascript:void(0)" onClick={() => this.viewSmileBox()} >
                                <i className="fa fa-smile-o" aria-hidden="true"> </i>
                            </a>
                        </footer>
                    </div>

                </main>

                <footer>
                    <div className={"smile-box "+(this.state.smilebox ? 'show' : 'hide')}>
                        <i className="em em-eyes" onClick={()=> this.pressIcon("em-eyes")}> </i>
                        <i className="em em-kiss" onClick={()=> this.pressIcon("em-kiss")}> </i>
                        <i className="em em---1" onClick={()=> this.pressIcon("em---1")}> </i>
                        <i className="em em--1" onClick={()=> this.pressIcon("em--1")}> </i>
                        <i className="em em-hand" onClick={()=> this.pressIcon("em-hand")}> </i>
                        <i className="em em-clap" onClick={()=> this.pressIcon("em-clap")}> </i>
                        <i className="em em-facepunch" onClick={()=> this.pressIcon("em-facepunch")}> </i>
                        <i className="em em-blue_heart" onClick={()=> this.pressIcon("em-blue_heart")}> </i>
                        <i className="em em-broken_heart" onClick={()=> this.pressIcon("em-broken_heart")}> </i>
                        <i className="em em-gift_heart" onClick={()=> this.pressIcon("em-gift_heart")}> </i>
                        <i className="em em-revolving_hearts" onClick={()=> this.pressIcon("em-revolving_hearts")}> </i>
                        <i className="em em-cupid" onClick={()=> this.pressIcon("em-cupid")}> </i>
                        <i className="em em-four_leaf_clover" onClick={()=> this.pressIcon("em-four_leaf_clover")}> </i>
                        <i className="em em-love_letter" onClick={()=> this.pressIcon("em-love_letter")}> </i>
                        <i className="em em-lipstick" onClick={()=> this.pressIcon("em-lipstick")}> </i>
                        <i className="em em-underage" onClick={()=> this.pressIcon("em-underage")}> </i>
                        <i className="em em-zzz" onClick={()=> this.pressIcon("em-zzz")}> </i>
                        <hr/>

                        <i className="em em-grinning" onClick={()=> this.pressIcon("em-grinning")}> </i>
                        <i className="em em-yum" onClick={()=> this.pressIcon("em-yum")}> </i>
                        <i className="em em-sunglasses" onClick={()=> this.pressIcon("em-sunglasses")}> </i>
                        <i className="em em-blush" onClick={()=> this.pressIcon("em-blush")}> </i>
                        <i className="em em-flushed" onClick={()=> this.pressIcon("em-flushed")}> </i>
                        <i className="em em-heart_eyes" onClick={()=> this.pressIcon("em-heart_eyes")}> </i>
                        <i className="em em-kissing_closed_eyes" onClick={()=> this.pressIcon("em-kissing_closed_eyes")}> </i>
                        <i className="em em-pensive" onClick={()=> this.pressIcon("em-pensive")}> </i>
                        <i className="em em-angry" onClick={()=> this.pressIcon("em-angry")}> </i>
                        <i className="em em-joy" onClick={()=> this.pressIcon("em-joy")}> </i>
                        <i className="em em-anguished" onClick={()=> this.pressIcon("em-anguished")}> </i>
                        <i className="em em-sweat" onClick={()=> this.pressIcon("em-sweat")}> </i>
                        <i className="em em-stuck_out_tongue" onClick={()=> this.pressIcon("em-stuck_out_tongue")}> </i>
                        <i className="em em-astonished" onClick={()=> this.pressIcon("em-astonished")}> </i>
                        <i className="em em-cold_sweat" onClick={()=> this.pressIcon("em-cold_sweat")}> </i>
                        <i className="em em-scream" onClick={()=> this.pressIcon("em-scream")}> </i>
                        <i className="em em-confused" onClick={()=> this.pressIcon("em-confused")}> </i>
                        <i className="em em-innocent" onClick={()=> this.pressIcon("em-innocent")}> </i>
                        <i className="em em-confounded" onClick={()=> this.pressIcon("em-confounded")}> </i>
                        <i className="em em-cry" onClick={()=> this.pressIcon("em-cry")}> </i>
                        <i className="em em-sleeping" onClick={()=> this.pressIcon("em-sleeping")}> </i>
                        <i className="em em-fearful" onClick={()=> this.pressIcon("em-fearful")}> </i>
                        <i className="em em-dizzy_face" onClick={()=> this.pressIcon("em-dizzy_face")}> </i>
                        <i className="em em-disappointed" onClick={()=> this.pressIcon("em-disappointed")}> </i>
                        <i className="em em-disappointed_relieved" onClick={()=> this.pressIcon("em-disappointed_relieved")}> </i>
                        <i className="em em-expressionless" onClick={()=> this.pressIcon("em-expressionless")}> </i>
                        <i className="em em-smiling_imp" onClick={()=> this.pressIcon("em-smiling_imp")}> </i>
                        <i className="em em-triumph" onClick={()=> this.pressIcon("em-triumph")}> </i>
                        <hr/>

                        <i className="em em-birthday" onClick={()=> this.pressIcon("em-birthday")}> </i>
                        <i className="em em-bouquet" onClick={()=> this.pressIcon("em-bouquet")}> </i>
                        <i className="em em-gem" onClick={()=> this.pressIcon("em-gem")}> </i>
                        <i className="em em-cherry_blossom" onClick={()=> this.pressIcon("em-cherry_blossom")}> </i>
                        <i className="em em-candy" onClick={()=> this.pressIcon("em-candy")}> </i>
                        <i className="em em-beers" onClick={()=> this.pressIcon("em-beers")}> </i>
                        <i className="em em-coffee" onClick={()=> this.pressIcon("em-coffee")}> </i>
                        <i className="em em-rose" onClick={()=> this.pressIcon("em-rose")}> </i>
                        <i className="em em-hamburger" onClick={()=> this.pressIcon("em-hamburger")}> </i>
                        <i className="em em-strawberry" onClick={()=> this.pressIcon("em-strawberry")}> </i>
                        <i className="em em-peach" onClick={()=> this.pressIcon("em-peach")}> </i>
                        <i className="em em-stew" onClick={()=> this.pressIcon("em-stew")}> </i>
                        <i className="em em-tropical_drink" onClick={()=> this.pressIcon("em-tropical_drink")}> </i>
                        <i className="em em-wine_glass" onClick={()=> this.pressIcon("em-wine_glass")}> </i>
                        <i className="em em-shaved_ice" onClick={()=> this.pressIcon("em-shaved_ice")}> </i>

                        <hr/>
                        <i className="em em-partly_sunny" onClick={()=> this.pressIcon("em-partly_sunny")}> </i>
                        <i className="em em-palm_tree" onClick={()=> this.pressIcon("em-palm_tree")}> </i>
                        <i className="em em-snowflake" onClick={()=> this.pressIcon("em-snowflake")}> </i>
                        <i className="em em-umbrella" onClick={()=> this.pressIcon("em-umbrella")}> </i>
                        <i className="em em-art" onClick={()=> this.pressIcon("em-art")}> </i>
                        <i className="em em-basketball" onClick={()=> this.pressIcon("em-basketball")}> </i>
                        <i className="em em-bike" onClick={()=> this.pressIcon("em-bike")}> </i>
                        <i className="em em-soccer" onClick={()=> this.pressIcon("em-soccer")}> </i>
                        <i className="em em-bikini" onClick={()=> this.pressIcon("em-bikini")}> </i>
                        <i className="em em-boat" onClick={()=> this.pressIcon("em-boat")}> </i>
                        <i className="em em-swimmer" onClick={()=> this.pressIcon("em-swimmer")}> </i>
                        <i className="em em-books" onClick={()=> this.pressIcon("em-books")}> </i>
                        <i className="em em-briefcase" onClick={()=> this.pressIcon("em-briefcase")}> </i>
                        <i className="em em-shower" onClick={()=> this.pressIcon("em-shower")}>  </i>
                        <i className="em em-cat2" onClick={()=> this.pressIcon("em-cat2")}> </i>
                        <i className="em em-circus_tent" onClick={()=> this.pressIcon("em-circus_tent")}> </i>
                        <i className="em em-computer" onClick={()=> this.pressIcon("em-computer")}> </i>
                        <i className="em em-crystal_ball" onClick={()=> this.pressIcon("em-crystal_ball")}> </i>
                        <i className="em em-fishing_pole_and_fish" onClick={()=> this.pressIcon("em-fishing_pole_and_fish")}> </i>
                        <i className="em em-guitar" onClick={()=> this.pressIcon("em-guitar")}> </i>
                        <i className="em em-performing_arts" onClick={()=> this.pressIcon("em-performing_arts")}> </i>
                        <i className="em em-christmas_tree" onClick={()=> this.pressIcon("em-christmas_tree")}> </i>
                    </div>
                    <textarea id="message" autoComplete="off"/>
                    <a className="button" href="javascript:void(0)" onClick={() => this.submitMessage()}>
                        <i className="fa fa-paper-plane" aria-hidden="true"> </i>
                    </a>
                    <a className="button smile" href="javascript:void(0)" onClick={() => this.viewSmileBox()} >
                        <i className="fa fa-smile-o" aria-hidden="true"> </i>
                    </a>

                </footer>
            </div>
        )
    }
};

export default Chat;
