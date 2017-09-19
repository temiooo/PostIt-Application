import * as types from '../actions/actionTypes';
import initialState from './initialState';

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        currentUserId: action.user.userId,
        isAuthenticated: true
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        currentUserId: action.user.userId,
        isAuthenticated: true
      };

    case types.LOGOUT:
      return {
        ...state,
        currentUserId: '',
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default authReducer;
