import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers';

/**
 * Configures and sets up the redux store in development
 *
 * @param {Object} initialState - Initial State of the application
 *
 * @returns {Object} Redux Store
 */
export default initialState =>
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(logger, thunk, reduxImmutableStateInvariant())
  );
