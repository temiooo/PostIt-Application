import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Reducer that handles groups a user belongs to
 * @param {array} state - initial state
 * @param {object} action - the dispatched action
 * @returns {array} new state of group section of the store
 */
const groupReducer = (state = initialState.groups, action) => {
  switch (action.type) {
    case types.GET_USER_GROUPS_SUCCESS:
      return action.groups;

    case types.GET_USER_GROUPS_FAILURE:
      return state;

    case types.CREATE_GROUP_SUCCESS:
      return [...state, action.group];

    case types.CREATE_GROUP_FAILURE:
      return state;

    default:
      return state;
  }
};

export default groupReducer;
