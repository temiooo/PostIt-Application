import * as types from '../actions/actionTypes';
import initialState from './initialState';

const groupReducer = (state = initialState.groups, action) => {
  switch (action.type) {
    case types.GET_GROUPS_SUCCESS:
      return action.groups;

    default:
      return state;
  }
};

export default groupReducer;
