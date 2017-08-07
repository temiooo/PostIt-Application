import { combineReducers } from 'redux';
import auth from './authReducer';
import groups from './groupReducer';

const rootReducer = combineReducers({
  auth,
  groups
});

export default rootReducer;
