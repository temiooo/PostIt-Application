/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import routes from './routes';
import { loginSuccess } from './actions/authActions';
import setAuthorizationToken from './utils/setAuthorizationToken';
import './styles/styles.scss';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(loginSuccess(jwtDecode(localStorage.jwtToken)));
}

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
