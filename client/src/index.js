/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import routes from './routes';
import { loginSuccess } from './actions/authActions';
import setAuthorizationToken from './utils/setAuthorizationToken';
import './styles/styles.scss';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(loginSuccess(jwt.decode(localStorage.jwtToken)));
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
