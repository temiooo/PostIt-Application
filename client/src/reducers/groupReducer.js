import * as types from '../actions/actionTypes';
import initialState from './initialState';

const groupReducer = (state = initialState.groups, action) => {
  switch (action.type) {
    case types.GET_GROUPS_SUCCESS:
      return action.groups;

    case types.CREATE_GROUP_SUCCESS:
      return [...state, action.group];

    default:
      return state;
  }
};

export default groupReducer;
