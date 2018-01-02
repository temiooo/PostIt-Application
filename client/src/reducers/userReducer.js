import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Reducers that handles members and non-members of a group
 *
 * @param {Object} state - initial state
 * @param {Object} action - the dispatched action
 *
 * @returns {Object} new state of the users section of the store
 */
const userReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case types.GET_GROUP_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.members,
      };

    case types.GET_GROUP_MEMBERS_FAILURE:
      return state;

    case types.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        nonMembers: action.users.users,
        pagination: action.users.pagination
      };

    case types.SEARCH_USERS_FAILURE:
      return {
        ...state,
        nonMembers: [],
        pagination: {}
      };

    default:
      return state;
  }
};

export default userReducer;
