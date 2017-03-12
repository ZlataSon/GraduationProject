import React from 'react';
// import 'https://afeld.github.io/emoji-css/emoji.css';

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <ul id="messages"> </ul>
                <form action="">
                    <input type="text" id="m" autocomplete="off"/>
                    <button>Send</button>
                </form>

            </div>
        );
    }
});
