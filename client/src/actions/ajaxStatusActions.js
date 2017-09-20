import * as types from './actionTypes';

const beginAjaxCall = () => ({
  type: types.BEGIN_AJAX_CALL
});

const ajaxCallError = () => ({
  type: types.AJAX_CALL_ERROR
});

const ajaxCallSuccess = () => ({
  type: types.AJAX_CALL_SUCCESS
});

export {
  beginAjaxCall, ajaxCallError,
  ajaxCallSuccess
};
