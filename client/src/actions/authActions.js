import axios from 'axios';
import toastr from 'toastr';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './actionTypes';

const signupSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  user
});

const signupFailure = () => ({
  type: types.SIGNUP_FAILURE,
});

const loginSuccess = user => ({
  type: types.LOGIN_SUCCESS,
  user
});

const loginFailure = () => ({
  type: types.LOGIN_FAILURE
});

const signup = userDetails => dispatch => axios
  .post('/api/user/signup', userDetails)
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(signupSuccess(response.data.user));
  })
  .catch((error) => {
    dispatch(signupFailure());
    toastr.error(error.response.data.message);
  });


const login = userDetails => dispatch => axios
  .post('/api/user/signin', userDetails)
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(loginSuccess(response.data.user));
  })
  .catch((error) => {
    dispatch(loginFailure());
    toastr.error(error.response.data.message);
  });


const logout = () => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  return { type: types.LOGOUT };
};

export {
  signup, signupSuccess, signupFailure, login,
  loginSuccess, loginFailure, logout
};
