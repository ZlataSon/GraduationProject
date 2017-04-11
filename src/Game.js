import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TargetIcon from 'material-ui/svg-icons/image/crop-free';
import RaisedButton from 'material-ui/RaisedButton';
import PeopleIcon from 'material-ui/svg-icons/social/people';

const BOARD_SIZE = 15;
const CELL_SIZE = 29;
const ICON_SIZE = 24;
const CHESS_SIZE = 28;

export default class Game extends Component {
    constructor(props) {
        super(props);
        console.log('constructor Game');
        console.dir(props);
        let a=[];
        for (let i = 0; i < BOARD_SIZE; i++) { a[i]=[];
            for (let j = 0; j < BOARD_SIZE; j++) { a[i][j] = -1; } }

        this.state = {
            gameID: props.gameID,
            socket: props.socket,
            name: props.user.name,
            sex: props.user.sex,
            connections:props.connections,

            player1: '',
            player2: '',
            targetX: 0,
            targetY: 0,

            currentColor: 0,
            lastRow: -1,
            lastCol: -1,
            isFinished: false,
            youWon: false,
            youLost: false,
            canMove: true,
            board: a
        };

        this.myColor = '';

        this.move = this.move.bind(this);

        this.quit = this.quit.bind(this);
    }

    // componentDidMount() {
    //     console.log('did mount component Game');
    //     console.dir(this.props);
    //     if (!this.props.user.name) {
    //         if (window.performance.navigation.type == 1) {
    //             browserHistory.push('/');
    //         }
    //     }
    // }
    componentWillMount() {
        this.state.socket.on("init-game-onclient", (game) => {
            console.log('init game');
            console.dir(game);
            this.myColor = '';
            const idx1 = this.state.connections.findIndex(function (conn) { return conn.socketID === game.player1 });
            const idx2 = this.state.connections.findIndex(function (conn) { return conn.socketID === game.player2 });
            this.setState({
                gameID: game.gameID,
                player1:this.state.connections[idx1].name,
                player2:this.state.connections[idx2].name
            });
            if (game.player1 == this.state.socket.id) this.myColor = 0;
            if (game.player2 == this.state.socket.id) this.myColor = 1;
            // this.setState({messages: messages});
        });

        this.state.socket.on("showMove", (param) => {
            console.log('Show move');
            console.dir(param);
            let {lastRow,lastCol,currentColor, board} = this.state;
            let {row, col, color} = param;

            currentColor = 1 - currentColor;
            board[row][col] = color;
            lastRow = row;
            lastCol = col;

            this.setState({lastRow, lastCol, currentColor, board});
        });

        this.state.socket.on("finish-game", (param) => {
            console.log('Finish game');
            console.dir(param);
            let { isFinished } = param;
            if (param.winner==this.state.socket.id) this.setState({youWon:true});
            else this.setState({youLost:true});

            // let {lastRow,lastCol,currentColor, board} = this.state;
            // let {row, col, color} = param;
            //
            // currentColor = 1 - currentColor;
            // board[row][col] = color;
            // lastRow = row;
            // lastCol = col;

            this.setState({isFinished});
        });

        if (!this.state.gameID) {
            const param = {gameID: this.props.params.gameID};
            this.state.socket.emit("init-game-onclient",param);
        }
    }
    componentWillUnmount() {
        this.state.socket.off("init-game-onclient");
        this.state.socket.off("showMove");
        this.state.socket.off("finish-game");
    }
    componentWillReceiveProps (props) {
        this.setState({
            gameID: props.gameID
        });
    }
    getTargetPosition(e) {
        const rect = e.target.getBoundingClientRect();

        let targetX = e.clientX - rect.left;
        let targetY = e.clientY - rect.top;

        targetX = Math.round(targetX / CELL_SIZE) * CELL_SIZE;
        targetY = Math.round(targetY / CELL_SIZE) * CELL_SIZE;

        return {targetX, targetY};
    }

    onMouseMove(e) {
        let {targetX, targetY} = this.getTargetPosition(e);

        targetX -= ICON_SIZE / 2;
        targetY -= ICON_SIZE / 2;

        this.setState({targetX, targetY});
    }

    move(row, col) {
        console.log('Move');
        console.dir(this.state.gameID);
        const color = this.myColor;
        const gameID = this.state.gameID;
        const param = {gameID, row, col, color};
        this.state.socket.emit("move",param);
    }

    onClick(e) {
        const {targetX, targetY} = this.getTargetPosition(e);
        const row = targetY / CELL_SIZE;
        const col = targetX / CELL_SIZE;
        this.move(row,col);
    }

    quit(e) {
        const path = `/chat`;
        browserHistory.push(path);
    }

    render() {
         const {board, isFinished, lastRow, lastCol} = this.state;

        let canMove= true;
        let cyan500 = '#00bcd4';
        const {targetX, targetY} = this.state;
        const targetStyle = {left: targetX, top: targetY};
        let chesses = [];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] > -1) {
                    let chessClassName = 'chess chess-' + (board[i][j] === 0 ? 'black' : 'white');
                    if (i === lastRow && j === lastCol) {
                        chessClassName += ' last';
                    }
                    let chessStyle = {
                        left: j * CELL_SIZE - CHESS_SIZE / 2,
                        top: i * CELL_SIZE - CHESS_SIZE / 2,
                        width: CHESS_SIZE,
                        height: CHESS_SIZE
                    };
                    let key = i * BOARD_SIZE + j;

                    chesses.push(
                        <div className={ chessClassName } style={ chessStyle } key={ key }></div>
                    );
                }
            }
        }
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div className='game-container'>
                <h2><span>{this.state.player1} & {this.state.player2} </span>
                {this.state.youWon? <span> / You Won !!!</span> : null}
                {this.state.youLost? <span> / You Lost !!!</span> : null}
                </h2>
                <div className='main-pane'>
                    <div className='left-pane'>
                        <div className='game-board'>
                            <div className='grid'></div>

                            <div className='point-container'>
                                <div className='p0'></div>
                                <div className='p1'></div>
                                <div className='p2'></div>
                                <div className='p3'></div>
                                <div className='p4'></div>
                            </div>

                            <div className='chess-container'>
                                { chesses }
                            </div>

                            { !isFinished && canMove &&
                            <div className='target-container'>
                                <div className='target' style={ targetStyle }>
                                    <TargetIcon color={cyan500}/>
                                </div>
                            </div>
                            }
                            { !isFinished && canMove &&
                            <div
                                className='grid-overlay'
                                onMouseMove={ this.onMouseMove.bind(this) }
                                onClick={ this.onClick.bind(this) }
                            >
                            </div>
                            }
                        </div>
                    </div>
                </div>

                <a href="javascript:void(0)" className="chat-btn button" onClick={this.quit}>Chat</a>
            </div>
            </MuiThemeProvider>
        );
    }
}