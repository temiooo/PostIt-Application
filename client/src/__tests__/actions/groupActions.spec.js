import moxios from 'moxios';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData';
import * as types from '../../actions/actionTypes';
import { getGroup, getUserGroups, createGroup, updateGroup }
  from '../../actions/groupActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Group Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates GET_GROUP_SUCCESS when getGroup action is successful', () => {
    const { group } = mockData;
    moxios.stubRequest('/api/group/1', {
      status: 200,
      response: group
    });

    const expectedActions = [
      { type: types.GET_GROUP_SUCCESS, group }
    ];

    const store = mockStore({});
    return store.dispatch(getGroup(1)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  it('creates GET_GROUP_FAILURE when getGroup action fails', () => {
    moxios.stubRequest('/api/group/1', {
      status: 400,
      response: 'An error occured'
    });

    const expectedActions = [
      { type: types.GET_GROUP_FAILURE }
    ];

    const store = mockStore({});
    return store.dispatch(getGroup(1)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  it(`creates GET_USER_GROUPS_SUCCESS when getUserGroups action
    is successful`, () => {
      const { groups } = mockData;
      moxios.stubRequest('/api/user/1/groups', {
        status: 200,
        response: groups
      });

      const expectedActions = [
        { type: types.GET_USER_GROUPS_SUCCESS, groups }
      ];

      const store = mockStore({});
      return store.dispatch(getUserGroups(1)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

  it('creates GET_USER_GROUPS_FAILURE when getUserGroups action fails', () => {
    moxios.stubRequest('/api/user/1/groups', {
      status: 400,
      response: 'An error occured'
    });

    const expectedActions = [
      { type: types.GET_USER_GROUPS_FAILURE }
    ];

    const store = mockStore({});
    return store.dispatch(getUserGroups(1)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  it(`creates CREATE_GROUP_SUCCESS when createGroup action
    is successful`, () => {
      const { group } = mockData;
      moxios.stubRequest('/api/group', {
        status: 200,
        response: { group }
      });

      const expectedActions = [
        { type: types.CREATE_GROUP_SUCCESS, group }
      ];

      const store = mockStore({});
      return store.dispatch(createGroup({ name: 'group E' }))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });

  it('creates CREATE_GROUP_FAILURE when createGroup action fails', () => {
    moxios.stubRequest('/api/group', {
      status: 400,
      response: 'An error occured'
    });

    const expectedActions = [
      { type: types.CREATE_GROUP_FAILURE }
    ];

    const store = mockStore({});
    return store.dispatch(createGroup({ name: 'group E' }))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it(`creates GET_USER_GROUPS_SUCCESS and UPDATE_GROUP_INFO when
    updateGroup action is successful`, () => {
      const { group, groups, userDetail } = mockData;
      const { id, name } = group;
      moxios.stubRequest('/api/group/1', {
        status: 200,
        response: 'Group updated successfully'
      });

      moxios.stubRequest('/api/user/2/groups', {
        status: 200,
        response: groups
      });

      const expectedActions = [
        { type: types.GET_USER_GROUPS_SUCCESS, groups },
        { type: types.UPDATE_GROUP_INFO, group: group.name }
      ];

      const store = mockStore({});
      return store.dispatch(updateGroup(name, id, userDetail.userId))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });

  it('creates GET_USER_GROUPS_FAILURE when updateGroup action fails', () => {
    const { group, userDetail } = mockData;
    const { id, name } = group;
    moxios.stubRequest('/api/group/1', {
      status: 400,
      response: 'Group updated successfully'
    });

    const expectedActions = [
      { type: types.GET_USER_GROUPS_FAILURE }
    ];

    const store = mockStore({});
    return store.dispatch(updateGroup(name, id, userDetail.userId))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});
