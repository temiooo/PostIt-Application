import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import SignupPage from './components/authentication/SignupPage';
import LoginPage from './components/authentication/LoginPage';
import messageboard from './components/messages/messageboard';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={SignupPage} />
        <Route path="login" component={LoginPage} />
        <Route path="messageboard" component={messageboard} />
    </Route>
);
