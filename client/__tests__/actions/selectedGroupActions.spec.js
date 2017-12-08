import moxios from 'moxios';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData';
import * as types from '../../src/actions/actionTypes';
import {
  getGroup,
  editGroup,
  getMessages,
  postMessage,
  editGroupOn,
  editGroupOff
} from '../../src/actions/selectedGroupActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Selected Group Actions', () => {
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

  it(`creates GET_USER_GROUPS_SUCCESS and EDIT_GROUP_SUCCESS when
  editGroup action is successful`, () => {
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
        { type: types.EDIT_GROUP_SUCCESS, group: group.name }
      ];

      const store = mockStore({});
      return store.dispatch(editGroup(name, id, userDetail.userId))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });

  it(`creates GET_USER_GROUPS_FAILURE and EDIT_GROUP_FAILURE when editGroup
  action fails`, () => {
      const { group, userDetail } = mockData;
      const { id, name } = group;
      moxios.stubRequest('/api/group/1', {
        status: 400,
        response: 'An error occured'
      });

      const expectedActions = [
        { type: types.GET_USER_GROUPS_FAILURE },
        { type: types.EDIT_GROUP_FAILURE }
      ];

      const store = mockStore({});
      return store.dispatch(editGroup(name, id, userDetail.userId))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });


  it(`creates BEGIN_AJAX_CALL, GET_MESSAGES_SUCCESS and AJAX_CALL_SUCCESS
    when getMessages action is successful`, () => {
      const { messages } = mockData;
      moxios.stubRequest('/api/group/1/messages', {
        status: 200,
        response: messages
      });

      const expectedActions = [
        { type: types.BEGIN_AJAX_CALL },
        { type: types.GET_MESSAGES_SUCCESS, id: 1, data: messages },
        { type: types.AJAX_CALL_SUCCESS }
      ];

      const store = mockStore({});
      return store.dispatch(getMessages(1)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

  it(`creates BEGIN_AJAX_CALL, GET_MESSAGES_FAILURE and AJAX_CALL_ERROR
    when getMessages action is successful`, () => {
      moxios.stubRequest('/api/group/1/messages', {
        status: 400,
        response: 'An error occured'
      });

      const expectedActions = [
        { type: types.BEGIN_AJAX_CALL },
        { type: types.AJAX_CALL_ERROR },
        { type: types.GET_MESSAGES_FAILURE }
      ];

      const store = mockStore({});
      return store.dispatch(getMessages(1)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

  it(`creates POST_MESSAGE_SUCCESS when postMessage action
    is successful`, () => {
      const { message } = mockData;
      moxios.stubRequest('/api/group/1/message', {
        status: 200,
        response: { message }
      });

      const expectedActions = [
        { type: types.POST_MESSAGE_SUCCESS, message }
      ];

      const store = mockStore({});
      return store.dispatch(postMessage(1)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

  it(`creates POST_MESSAGE_FAILURE when postMessage action
    is successful`, () => {
      moxios.stubRequest('/api/group/1/message', {
        status: 400,
        response: 'An error occured'
      });

      const expectedActions = [
        { type: types.POST_MESSAGE_FAILURE }
      ];

      const store = mockStore({});
      return store.dispatch(postMessage(1)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

  it('creates an action that turns edit group status on', () => {
    const expectedAction = {
      type: types.EDIT_GROUP_ON
    };

    expect(editGroupOn()).to.eql(expectedAction);
  });

  it('creates an action that turns edit group status off', () => {
    const expectedAction = {
      type: types.EDIT_GROUP_OFF
    };

    expect(editGroupOff()).to.eql(expectedAction);
  });
});
