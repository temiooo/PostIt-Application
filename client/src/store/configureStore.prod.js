import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/**
 * Configures and sets up the redux store in production
 *
 * @param {Object} initialState - Initial state of the application
 *
 * @returns {Object} Redux Store
 */
export default initialState =>
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
