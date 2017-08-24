import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupPage from './components/authentication/SignupPage';
import LoginPage from './components/authentication/LoginPage';
import Messageboard from './components/messages/MessageBoard';

export default (
  <div>
  <Switch>
    <Route exact path="/" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/messageboard" component={Messageboard} />
  </Switch>
  </div>
);
