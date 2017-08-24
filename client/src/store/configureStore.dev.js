import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers';

export default initialState =>
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(logger, thunk, reduxImmutableStateInvariant())
  );
