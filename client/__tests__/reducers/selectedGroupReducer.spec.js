import { expect } from 'chai';
import initialState from '../../src/reducers/initialState';
import selectedGroupReducer from '../../src/reducers/selectedGroupReducer';
import {
  editGroupOn,
  editGroupOff,
  getGroupSuccess,
  getGroupFailure,
  editGroupSuccess,
  editGroupFailure,
  getMessagesSuccess,
  getMessagesFailure,
  postMessageSuccess,
  postMessageFailure
} from '../../src/actions/selectedGroupActions';

let action;
let newState;

describe('Selected Group Reducer', () => {
  it('should return the initial state for unknown action type', () => {
    action = {
      type: null
    };
    newState = selectedGroupReducer(initialState.selectedGroup, action);

    expect(newState).to.equal(initialState.selectedGroup);
  });

  it('should handle action type EDIT_GROUP_ON', () => {
    action = editGroupOn();
    newState = selectedGroupReducer(initialState.selectedGroup, action);

    expect(newState.editGroupStatus).to.equal(true);
    expect(newState.editGroupStatus).to.not.equal(initialState.editGroupStatus);
  });

  it('should handle action type EDIT_GROUP_OFF', () => {
    action = editGroupOff();
    newState = selectedGroupReducer(initialState.selectedGroup, action);

    expect(newState.editGroupStatus).to.equal(false);
  });

  it('should handle action type GET_GROUP_SUCCESS', () => {
    const group = { id: 11, name: 'Node' };
    action = getGroupSuccess(group);
    newState = selectedGroupReducer(initialState.selectedGroup, action);

    expect(newState.groupName).to.equal('Node');
  });

  it('should handle action type GET_GROUP_FAILURE', () => {
    action = getGroupFailure();
    newState = selectedGroupReducer(initialState.selectedGroup, action);

    expect(newState.groupName).to.equal('');
  });

  it('should handle action type EDIT_GROUP_SUCCESS', () => {
    const firstState = {
      groupId: '30',
      groupName: 'Express',
      groupMessages: [{ id: 1, content: 'joy joy', priority: 'Normal' }],
      editGroupStatus: false
    };
    const group = { id: 30, name: 'Meteor' };
    action = editGroupSuccess(group);
    newState = selectedGroupReducer(firstState, action);

    expect(newState.groupName).to.equal('Meteor');
    expect(newState.groupId).to.equal('30');
  });

  it('should handle action type EDIT_GROUP_FAILURE', () => {
    const firstState = {
      groupId: '30',
      groupName: 'Express',
      groupMessages: [{ id: 1, content: 'joy joy', priority: 'Normal' }],
      editGroupStatus: false
    };
    action = editGroupFailure();
    newState = selectedGroupReducer(firstState, action);

    expect(newState.groupName).to.not.equal('Meteor');
    expect(newState.groupName).to.equal(firstState.groupName);
    expect(newState.groupId).to.equal('30');
  });


  it('should handle action type GET_MESSAGES_SUCCESS', () => {
    const id = 22;
    const data = [
      { id: 1, content: 'My First Message', priority: 'Normal' },
      { id: 2, content: 'A second message', priority: 'Urgent' }
    ];
    action = getMessagesSuccess(id, data);
    newState = selectedGroupReducer(initialState.selectedGroup, action);

    expect(newState.groupId).to.equal(22);
    expect(newState.groupName).to.equal('');
    expect(newState.groupMessages).to.equal(data);
  });

  it('should handle action type GET_MESSAGES_FAILURE', () => {
    action = getMessagesFailure();
    newState = selectedGroupReducer(initialState.selectedGroup, action);

    expect(newState).to.equal(initialState.selectedGroup);
  });

  it('should handle action type POST_MESSAGE_SUCCESS', () => {
    const firstState = {
      groupId: '30',
      groupName: 'Express',
      groupMessages: [{ id: 1, content: 'joy joy', priority: 'Normal' }]
    };
    const message = { id: 11, content: 'A new message', priority: 'Critical' };
    action = postMessageSuccess(message);
    newState = selectedGroupReducer(firstState, action);

    expect(newState).to.not.equal(firstState);
    expect(newState.groupMessages.length).to.equal(2);
    expect(newState.groupId).to.exist;
    expect(newState.groupMessages[1].priority).to.equal('Critical');
  });

  it('should handle action type POST_MESSAGE_FAILURE', () => {
    action = postMessageFailure();
    newState = selectedGroupReducer(initialState.selectedGroup, action);

    expect(newState).to.equal(initialState.selectedGroup);
    expect(newState.groupMessages).to.eql([]);
  });
});
