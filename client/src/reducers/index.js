import { combineReducers } from 'redux';
import auth from './authReducer';
import users from './userReducer';
import groups from './groupReducer';
import messages from './messageReducer';
import * as types from '../actions/actionTypes';
import editGroupStatus from './editGroupReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const appReducer = combineReducers({
  auth,
  groups,
  messages,
  users,
  ajaxCallsInProgress,
  editGroupStatus
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
