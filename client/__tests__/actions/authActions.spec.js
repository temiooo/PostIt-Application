import moxios from 'moxios';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import * as types from '../../src/actions/actionTypes';
import { signup, login, logout } from '../../src/actions/authActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
window.localStorage = mockLocalStorage;

describe('Auth Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());


  it('creates SIGNUP_SUCCESS when signup action is successful', () => {
    const { authResponse } = mockData;
    moxios.stubRequest('/api/user/signup', {
      status: 200,
      response: authResponse
    });

    const expectedActions = [
      { type: types.SIGNUP_SUCCESS, user: authResponse.user }
    ];

    const store = mockStore({});
    return store.dispatch(signup({})).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  it('creates SIGNUP_FAILURE when signup action fails', () => {
    moxios.stubRequest('/api/user/signup', {
      status: 400,
      response: 'An error occured'
    });

    const expectedActions = [
      { type: types.SIGNUP_FAILURE }
    ];

    const store = mockStore({});
    return store.dispatch(signup({})).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  it('creates LOGIN_SUCCESS when login action is successful', () => {
    const { authResponse } = mockData;
    moxios.stubRequest('/api/user/signin', {
      status: 200,
      response: authResponse
    });

    const expectedActions = [
      { type: types.LOGIN_SUCCESS, user: authResponse.user }
    ];

    const store = mockStore({});
    return store.dispatch(login({})).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  it('creates LOGIN_FAILURE when login action fails', () => {
    moxios.stubRequest('/api/user/signin', {
      status: 400,
      response: 'An error occured'
    });

    const expectedActions = [
      { type: types.LOGIN_FAILURE }
    ];

    const store = mockStore({});
    return store.dispatch(login({})).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  it('creates LOGOUT when logout action is successful', (done) => {
    const expectedActions = {
      type: types.LOGOUT
    };

    expect(logout()).to.eql(expectedActions);
    done();
  });
});
