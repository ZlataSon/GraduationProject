import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App';
import Login from './Login';
import Chat from './Chat';
import Game from './Game';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="/chat" component={Chat} />
            <Route path="/game" component={Game} />
            <Route path="/game/:userID" component={Game} />
        </Route>
    </Router>),
     document.getElementById('root')
);