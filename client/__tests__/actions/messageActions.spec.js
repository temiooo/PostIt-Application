import moxios from 'moxios';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData';
import * as types from '../../src/actions/actionTypes';
import { getMessages, postMessage } from '../../src/actions/messageActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Message Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

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
});
