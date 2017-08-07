import axios from 'axios';
import toastr from 'toastr';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './actionTypes';

export function signupSuccess(user) {
  return { type: types.SIGNUP_SUCCESS, user };
}

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user };
}

export function signup(userDetails) {
  return dispatch =>
    axios.post('/api/user/signup', userDetails)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(signupSuccess(response.data));
      })
      .catch((error) => {
        toastr.error(error.response.data.message);
      });
}

export function login(userDetails) {
  return dispatch =>
    axios.post('/api/user/signin', userDetails)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        toastr.error(error.response.data.message);
      });
}

export function logout() {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  return { type: types.LOGOUT };
}
