import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupPage from './components/authentication/SignupPage';
import LoginPage from './components/authentication/LoginPage';
import Messageboard from './components/messages/MessageBoard';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetPassword from './components/authentication/ResetPassword';

export default (
  <div>
  <Switch>
    <Route exact path="/" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/messageboard" component={Messageboard} />
    <Route path="/forgotpassword" component={ForgotPassword} />
    <Route path="/resetpassword/:token" component={ResetPassword} />
  </Switch>
  </div>
);
