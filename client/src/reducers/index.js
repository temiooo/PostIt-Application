import { combineReducers } from 'redux';
import auth from './authReducer';
import groups from './groupReducer';
import messages from './messageReducer';

const rootReducer = combineReducers({
  auth,
  groups,
  messages
});

export default rootReducer;
