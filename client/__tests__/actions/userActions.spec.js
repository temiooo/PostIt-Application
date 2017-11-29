import moxios from 'moxios';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../src/actions/actionTypes';
import mockData from '../__mocks__/mockData';
import { getGroupMembers, searchUsers, addUser }
  from '../../src/actions/userActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`creates GET_GROUP_MEMBERS_SUCCESS when getGroupMembers action
    is successful`, () => {
      const { members } = mockData;
      moxios.stubRequest('/api/group/1/users', {
        status: 200,
        response: members
      });

      const expectedActions = [
        { type: types.GET_GROUP_MEMBERS_SUCCESS, members }
      ];

      const store = mockStore({});
      return store.dispatch(getGroupMembers(1)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

  it(`creates GET_GROUP_MEMBERS_FAILURE when getGroupMembers action
    fails`, () => {
      moxios.stubRequest('/api/group/1/users', {
        status: 400,
        response: 'An error occured'
      });

      const expectedActions = [
        { type: types.GET_GROUP_MEMBERS_FAILURE }
      ];

      const store = mockStore({});
      return store.dispatch(getGroupMembers(1)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

  it(`creates SEARCH_USERS_SUCCESS when searchUsers action
    is successful`, () => {
      const { search, nonMembers } = mockData;
      const { searchTerm, group, limit, offset } = search;
      const queryString =
        '/api/search/users?searchTerm=a&group=1&limit=1&offset=1';
      moxios.stubRequest(`${queryString}`, {
        status: 200,
        response: nonMembers
      });

      const expectedActions = [
        { type: types.SEARCH_USERS_SUCCESS, users: nonMembers }
      ];

      const store = mockStore({});
      return store.dispatch(searchUsers(searchTerm, group, limit, offset))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });

  it('creates SEARCH_USERS_FAILURE when searchUsers action fails', () => {
    const { search } = mockData;
    const { searchTerm, group, limit, offset } = search;
    const queryString =
      '/api/search/users?searchTerm=a&group=1&limit=1&offset=1';
    moxios.stubRequest(`${queryString}`, {
      status: 400,
      response: 'An error occured'
    });

    const expectedActions = [
      { type: types.SEARCH_USERS_FAILURE }
    ];

    const store = mockStore({});
    return store.dispatch(searchUsers(searchTerm, group, limit, offset))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('creates no action when addUser action is successful', () => {
    const { group, userDetail } = mockData;
    moxios.stubRequest('/api/group/1/user', {
      status: 200,
      response: { message: 'User Added Successfully' }
    });

    const expectedActions = [];

    const store = mockStore({});
    return store.dispatch(addUser(group.id, userDetail)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
