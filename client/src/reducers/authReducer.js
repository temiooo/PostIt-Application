import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.currentUser, action) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return {
        currentUser: action.user.userId
      };

    case types.SIGNUP_FAILURE:
      return state;

    case types.LOGOUT_SUCCESS:
      return {
        currentUser: ''
      };

    default:
      return state;
  }
}
