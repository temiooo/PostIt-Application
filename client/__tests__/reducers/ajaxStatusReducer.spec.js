import { expect } from 'chai';
import ajaxStatusReducer from '../../src/reducers/ajaxStatusReducer';
import initialState from '../../src/reducers/initialState';
import {
  beginAjaxCall,
  ajaxCallError,
  ajaxCallSuccess
} from '../../src/actions/ajaxStatusActions';

let action;
let firstState;
let newState;

describe('Ajax Status Reducer', () => {
  it('should return initial state for unknown action type', () => {
    action = {
      type: null
    };
    newState = ajaxStatusReducer(initialState.ajaxCallsInProgress, action);

    expect(newState).to.equal(initialState.ajaxCallsInProgress);
  });

  it('should handle action type BEGIN_AJAX_CALL', () => {
    action = beginAjaxCall();
    newState = ajaxStatusReducer(initialState.ajaxCallsInProgress, action);

    expect(newState).to.equal(1);
    expect(newState).to.not.equal(initialState.ajaxCallsInProgress);
  });

  it('should handle action type AJAX_CALL_SUCCESS', () => {
    firstState = { ajaxCallsInProgress: 1 };
    action = ajaxCallSuccess();
    newState = ajaxStatusReducer(firstState.ajaxCallsInProgress, action);

    expect(newState).to.equal(0);
    expect(newState).to.not.equal(firstState.ajaxCallsInProgress);
  });

  it('should handle action type AJAX_CALL_ERROR', () => {
    firstState = { ajaxCallsInProgress: 2 };
    action = ajaxCallError();
    newState = ajaxStatusReducer(firstState.ajaxCallsInProgress, action);

    expect(newState).to.equal(1);
    expect(newState).to.not.equal(firstState.ajaxCallsInProgress);
  });
});

