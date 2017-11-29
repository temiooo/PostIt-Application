import initialState from './initialState';
import * as types from '../actions/actionTypes';

/**
 * Reducer that handles user authentication
 * @param {object} state - initial state for the auth section of the store
 * @param {object} action - the dispatched action
 * @returns {object} new state of the auth section of the store
 */
const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.user
      };

    case types.SIGNUP_FAILURE:
      return state;

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.user
      };

    case types.LOGIN_FAILURE:
      return state;

    case types.LOGOUT:
      return state;

    default:
      return state;
  }
};

export default authReducer;
