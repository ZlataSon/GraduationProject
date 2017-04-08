import React, { Component } from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
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
            for (let j = 0; j < BOARD_SIZE; j++) { a[i][j] = undefined; } }

        this.state = {
            targetX: 0,
            targetY: 0,

            currentColor: 0,
            lastRow: -1,
            lastCol: -1,
            isFinished: false,
            canMove: true,
            board: a
        };

        this.move = this.move.bind(this);

        // Needed for onTouchTap fix Warning-Error
        injectTapEventPlugin();
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
        let {lastRow,lastCol,currentColor, board} = this.state;

        currentColor = 1 - currentColor;
        board[row][col] = currentColor;
        lastRow = row;
        lastCol = col;

        this.setState({lastRow, lastCol, currentColor, board});
    }

    onClick(e) {
        const {targetX, targetY} = this.getTargetPosition(e);
        const row = targetY / CELL_SIZE;
        const col = targetX / CELL_SIZE;
        this.move(row,col);
    }

    quit(e) {
        console.log('quit');
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

                <a href="/chat" className="chat-btn button">Chat</a>
            </div>
            </MuiThemeProvider>
        );
    }
}