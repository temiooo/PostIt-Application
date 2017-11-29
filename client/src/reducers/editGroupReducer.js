import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Reducer that handles edit group status
 * @param {boolean} state - initial state
 * @param {object} action - the dispatched action
 * @returns {boolean} new state of the editgroup section of the store
 */
const editGroupReducer = (state = initialState.editGroupStatus, action) => {
  switch (action.type) {
    case types.EDIT_GROUP_ON:
      return true;

    case types.EDIT_GROUP_OFF:
      return false;

    default:
      return state;
  }
};

export default editGroupReducer;
