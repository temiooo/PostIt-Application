import * as types from '../actions/actionTypes';
import initialState from './initialState';

const currentUserReducer = (state = initialState.currentUserInfo, action) => {
  switch (action.type) {
    case types.GET_USER_INFO_SUCCESS:
      return { ...state,
        username: action.userInfo.username,
        email: action.userInfo.email,
        joinedOn: action.userInfo.createdAt,
      };

    case types.GET_USER_INFO_FAILURE:
      return { ...state,
        username: '',
        email: '',
        joinedOn: null
      };

    default:
      return state;
  }
};

export default currentUserReducer;
