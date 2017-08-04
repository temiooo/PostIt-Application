import axios from 'axios';
import toastr from 'toastr';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './actionTypes';

export function signupSuccess(user) {
  return { type: types.SIGNUP_SUCCESS, user };
}

export function signupFailure() {
  return { type: types.SIGNUP_FAILURE };
}

export function logoutSuccess() {
  return {type: types.LOGOUT_SUCCESS }
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
        dispatch(signupFailure());
      });
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(logoutSuccess());
  };
}
/* export {signup, signupSuccess, signupFailure, 
    login, loginSuccess, loginFailure, logout};
*/
