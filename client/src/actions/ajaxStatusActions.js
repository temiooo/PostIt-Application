import * as types from './actionTypes';

/**
 * Action creator that signifies the beginining of an ajax call
 *
 * @returns {Object} action
 */
const beginAjaxCall = () => ({
  type: types.BEGIN_AJAX_CALL
});

/**
 * Action creator that signifies an ajax call was not successful
 *
 * @returns {Object} action
 */
const ajaxCallError = () => ({
  type: types.AJAX_CALL_ERROR
});

/**
 * Action creator that signifies an ajax call was successful
 *
 * @returns {Object} action
 */
const ajaxCallSuccess = () => ({
  type: types.AJAX_CALL_SUCCESS
});

export {
  beginAjaxCall, ajaxCallError, ajaxCallSuccess
};
