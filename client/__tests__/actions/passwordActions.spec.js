import moxios from 'moxios';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData';
import * as types from '../../src/actions/actionTypes';
import { forgotPassword, resetPassword } from '../../src/actions/passwordActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const { passwordActions } = mockData;

describe('Password Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`creates BEGIN_AJAX_CALL and AJAX_CALL_SUCCESS when forgotPassword action
   is successful`, () => {
      const { email } = passwordActions;
      moxios.stubRequest('/api/user/forgotpassword', {
        status: 200,
        response: {
          message: 'An email has been sent'
        }
      });

      const expectedActions = [
        { type: types.BEGIN_AJAX_CALL },
        { type: types.AJAX_CALL_SUCCESS }
      ];

      const store = mockStore({});
      return store.dispatch(forgotPassword({ email }))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });

  it(`creates BEGIN_AJAX_CALL and AJAX_CALL_ERROR when forgotPassword action
    fails`, () => {
      const { email } = passwordActions;
      moxios.stubRequest('/api/user/forgotpassword', {
        status: 400,
        response: {
          message: 'An error occured'
        }
      });

      const expectedActions = [
        { type: types.BEGIN_AJAX_CALL },
        { type: types.AJAX_CALL_ERROR }
      ];

      const store = mockStore({});
      return store.dispatch(forgotPassword({ email }))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });

  it(`creates BEGIN_AJAX_CALL and AJAX_CALL_SUCCESS when resetPassword action
    is successful`, () => {
      const { resetToken, password } = passwordActions;
      moxios.stubRequest('/api/user/resetpassword/TjDkmRh3mYTayaN2NKBWUrtmG4', {
        status: 200,
        response: {
          message: 'Password Reset Successful'
        }
      });

      const expectedActions = [
        { type: types.BEGIN_AJAX_CALL },
        { type: types.AJAX_CALL_SUCCESS }
      ];

      const store = mockStore({});
      return store.dispatch(resetPassword(resetToken, { password }))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });

  it(`creates BEGIN_AJAX_CALL and AJAX_CALL_ERROR when resetPassword action
    fails`, () => {
      const { resetToken, password } = passwordActions;
      moxios.stubRequest('/api/user/resetpassword/TjDkmRh3mYTayaN2NKBWUrtmG4', {
        status: 400,
        response: {
          message: 'An error occured'
        }
      });

      const expectedActions = [
        { type: types.BEGIN_AJAX_CALL },
        { type: types.AJAX_CALL_ERROR }
      ];

      const store = mockStore({});
      return store.dispatch(resetPassword(resetToken, { password }))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
});
