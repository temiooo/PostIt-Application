import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import groupListReducer from './groupListReducer';
import selectedGroupReducer from './selectedGroupReducer';
import * as types from '../actions/actionTypes';
import ajaxStatusReducer from './ajaxStatusReducer';

const appReducer = combineReducers({
  auth: authReducer,
  groupList: groupListReducer,
  selectedGroup: selectedGroupReducer,
  users: userReducer,
  ajaxCallsInProgress: ajaxStatusReducer
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
