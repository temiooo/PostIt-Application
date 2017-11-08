import { expect } from 'chai';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import * as authActions from '../../actions/authActions';
import * as types from '../../actions/actionTypes';

let store;
let expectedActions;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async authActions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  // it('should dispatch signupSuccess when signup is successful', () => {
  //   moxios.stubRequest('/api/user/signin', {
  //     status: 200,
  //     response: { email: 'fakeemail@gmail.com', id: 5 }
  //   });

  //   expectedActions = [
  //     { type: types.LOGIN_SUCCESS }
  //   ];

  //   store = mockStore({});
  //   store.dispatch(authActions.login())
  //     .then(() => {
  //       const actions = store.getActions();
  //       console.log(actions, '.........');
  //       expect(actions).to.eql(expectedActions);
  //     });
  // });

  it('should dispatch loginSuccess when login is successful', () => {
    const data = {
      user: { email: 'fakeemail@gmail.com' }
    };

    moxios.stubRequest('/api/user/signin', {
      status: 200,
      response: data
    });

    expectedActions = [
      { type: types.LOGIN_SUCCESS, user: data.user }
    ];

    store = mockStore({});
    return store.dispatch(authActions.login({}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});

describe('sync authActions', () => {

});
