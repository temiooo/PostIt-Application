import { combineReducers } from 'redux';
import auth from './authReducer';
import groups from './groupReducer';
import messages from './messageReducer';
import users from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import editGroupStatus from './editGroupReducer';
import currentUserInfo from './currentUserReducer';
import * as types from '../actions/actionTypes';

const appReducer = combineReducers({
  auth,
  groups,
  messages,
  users,
  ajaxCallsInProgress,
  editGroupStatus,
  currentUserInfo
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
