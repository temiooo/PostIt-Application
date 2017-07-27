import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Signup from './components/authentication/signup';
import Signin from './components/authentication/signin';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Signup} />
        <Route path="signin" component={Signin} />
    </Route>
);
