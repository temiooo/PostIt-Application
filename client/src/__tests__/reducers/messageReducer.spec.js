import { expect } from 'chai';
import initialState from '../../reducers/initialState';
import messageReducer from '../../reducers/messageReducer';
import {
  getMessagesSuccess, getMessagesFailure,
  postMessageSuccess, postMessageFailure
} from '../../actions/messageActions';
import {
  getGroupSuccess, getGroupFailure, updateGroupInfo
} from '../../actions/groupActions';

let action;
let newState;

describe('Message Reducer', () => {
  it('should return the initial state for unknown action type', () => {
    action = {
      type: null
    };
    newState = messageReducer(initialState.messages, action);

    expect(newState).to.equal(initialState.messages);
  });

  it('should handle action type GET_MESSAGES_SUCCESS', () => {
    const id = 22;
    const data = [
      { id: 1, content: 'My First Message', priority: 'Normal' },
      { id: 2, content: 'A second message', priority: 'Urgent' }
    ];
    action = getMessagesSuccess(id, data);
    newState = messageReducer(initialState.messages, action);

    expect(newState.groupId).to.equal(22);
    expect(newState.groupName).to.equal('');
    expect(newState.groupMessages).to.equal(data);
  });

  it('should handle action type GET_MESSAGES_FAILURE', () => {
    action = getMessagesFailure();
    newState = messageReducer(initialState.messages, action);

    expect(newState).to.equal(initialState.messages);
  });

  it('should handle action type POST_MESSAGE_SUCCESS', () => {
    const firstState = {
      groupId: '30',
      groupName: 'Express',
      groupMessages: [{ id: 1, content: 'joy joy', priority: 'Normal' }]
    };
    const message = { id: 11, content: 'A new message', priority: 'Critical' };
    action = postMessageSuccess(message);
    newState = messageReducer(firstState, action);

    expect(newState).to.not.equal(firstState);
    expect(newState.groupMessages.length).to.equal(2);
    expect(newState.groupId).to.exist;
    expect(newState.groupMessages[1].priority).to.equal('Critical');
  });

  it('should handle action type POST_MESSAGE_FAILURE', () => {
    action = postMessageFailure();
    newState = messageReducer(initialState.messages, action);

    expect(newState).to.equal(initialState.messages);
    expect(newState.groupMessages).to.eql([]);
  });

  it('should handle action type GET_GROUP_SUCCESS', () => {
    const group = { id: 11, name: 'Node' };
    action = getGroupSuccess(group);
    newState = messageReducer(initialState.messages, action);

    expect(newState.groupName).to.equal('Node');
  });

  it('should handle action type GET_GROUP_FAILURE', () => {
    action = getGroupFailure();
    newState = messageReducer(initialState.messages, action);

    expect(newState.groupName).to.equal('');
  });

  it('should handle action type UPDATE_GROUP_INFO', () => {
    const firstState = {
      groupId: '30',
      groupName: 'Express',
      groupMessages: [{ id: 1, content: 'joy joy', priority: 'Normal' }]
    };
    const group = { id: 30, name: 'Meteor' };
    action = updateGroupInfo(group);
    newState = messageReducer(firstState, action);

    expect(newState.groupName).to.equal('Meteor');
    expect(newState.groupId).to.equal('30');
  });
});
