import axios from 'axios';
import toastr from 'toastr';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './actionTypes';

/**
 * Action creator for when signup is successful
 * @param {object} user
 * @returns {object} action
 */
const signupSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  user
});

/**
 * Action creator for when signup fails
 * @returns {object} action
 */
const signupFailure = () => ({
  type: types.SIGNUP_FAILURE
});

/**
 * Action creator for when login is successful
 * @param {object} user
 * @returns {object} action
 */
const loginSuccess = user => ({
  type: types.LOGIN_SUCCESS,
  user
});

/**
 * Action creator for when login fails
 * @returns {object} action
 */
const loginFailure = () => ({
  type: types.LOGIN_FAILURE
});

/**
 * Async action creator for signup
 * @param {object} userDetails
 * @returns {Promise} dispatches an action
 */
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

/**
 * Async action creator for login
 * @param {object} userDetails
 * @returns {Promise} dispatches an action
 */
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

/**
 * logout action creator
 * @returns {object} action
 */
const logout = () => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  return { type: types.LOGOUT };
};

export {
  signup, signupSuccess, signupFailure, login,
  loginSuccess, loginFailure, logout
};
