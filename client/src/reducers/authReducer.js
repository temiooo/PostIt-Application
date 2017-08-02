import * as types from '../actions/actionTypes';

export default function authReducer(state = initialState.loggedIn, action) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return { ...state, };

    default:
      return state;
  }
}
