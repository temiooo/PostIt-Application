import * as types from '../actions/actionTypes';
import initialState from './initialState';

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
