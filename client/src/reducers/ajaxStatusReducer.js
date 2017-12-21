import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Reducer that handles when an ajax call is being made
 *
 * @param {number} state - initial state
 * @param {object} action - the dispatched action
 *
 * @returns {number} new state of this section of the store
 */
const ajaxStatusReducer =
  (state = initialState.ajaxCallsInProgress, action) => {
    switch (action.type) {
      case types.BEGIN_AJAX_CALL:
        return state + 1;

      case types.AJAX_CALL_SUCCESS:
        return state - 1;

      case types.AJAX_CALL_ERROR:
        return state - 1;

      default:
        return state;
    }
  };

export default ajaxStatusReducer;
