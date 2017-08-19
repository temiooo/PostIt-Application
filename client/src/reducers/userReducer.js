import * as types from '../actions/actionTypes';
import initialState from './initialState';

const userReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case types.GET_GROUP_MEMBERS_SUCCESS:
      return { ...state,
        members: action.members,
      };

    case types.SEARCH_USERS_SUCCESS:
      return { ...state,
        nonMembers: action.users.users,
        pagination: action.users.pagination
      };

    case types.SEARCH_USERS_FAILURE:
      return { ...state,
        nonMembers: [],
        pagination: {}
      };

    default:
      return state;
  }
};

export default userReducer;
