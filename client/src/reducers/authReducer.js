import * as types from '../actions/actionTypes';
import initialState from './initialState';

const authReducer = (state = initialState.currentUser, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return {
        currentUser: action.user.userId
      };

    case types.LOGIN_SUCCESS:
      return {
        currentUser: action.user.userId
      };

    case types.LOGOUT:
      return {
        currentUser: ''
      };

    default:
      return state;
  }
};

export default authReducer;
