import { expect } from 'chai';
import authReducer from '../../src/reducers/authReducer';
import initialState from '../../src/reducers/initialState';
import {
  signupSuccess, signupFailure,
  loginSuccess, loginFailure
} from '../../src/actions/authActions';

let action;
let newState;
const user = { id: 6, name: 'ronald' };

describe('Auth Reducer', () => {
  it('should return the initial state for unknown action type', () => {
    action = {
      type: null
    };
    newState = authReducer(initialState.auth, action);

    expect(newState).to.equal(initialState.auth);
    expect(newState.isAuthenticated).to.equal(false);
    expect(newState.currentUser).to.eql({});
  });

  it('should handle action type SIGNUP_SUCCESS', () => {
    action = signupSuccess(user);
    newState = authReducer(initialState.auth, action);

    expect(newState).to.not.equal(initialState.auth);
    expect(newState.isAuthenticated).to.equal(true);
    expect(newState.currentUser).to.equal(user);
  });

  it('should handle action type SIGNUP_FAILURE', () => {
    action = signupFailure();
    newState = (authReducer(initialState.auth, action));

    expect(newState).to.equal(initialState.auth);
  });

  it('should handle action type LOGIN_SUCCESS', () => {
    action = loginSuccess(user);
    newState = (authReducer(initialState.auth, action));

    expect(newState).to.not.equal(initialState.auth);
    expect(newState.isAuthenticated).to.equal(true);
    expect(newState.currentUser).to.equal(user);
  });

  it('should handle action type LOGIN_FAILURE', () => {
    action = loginFailure();
    newState = authReducer(initialState.auth, action);

    expect(newState).to.equal(initialState.auth);
  });
});
