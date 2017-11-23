import { expect } from 'chai';
import groupReducer from '../../reducers/groupReducer';
import {
  getUserGroupsSuccess, getUserGroupsFailure,
  createGroupSuccess, createGroupFailure
} from '../../actions/groupActions';

let action;
let newState;
let initialState;

describe('Group Reducer', () => {
  it('should return the initial state for unknown action type', () => {
    initialState = [];
    action = {
      type: null
    };
    newState = groupReducer(initialState, action);

    expect(newState).to.equal(initialState);
  });

  it('should handle action type GET_USER_GROUPS_SUCCESS', () => {
    initialState = [];
    const groups = [{ id: 3, name: 'Group A' }, { id: 6, name: 'Group D' }];
    action = getUserGroupsSuccess(groups);
    newState = groupReducer(initialState, action);

    expect(newState).to.equal(groups);
    expect(newState.length).to.equal(2);
    expect(newState[0].name).to.equal(groups[0].name);
  });

  it('should handle action type GET_USER_GROUPS_FAILURE', () => {
    initialState = [{ id: 2, name: 'Accountant' }];
    action = getUserGroupsFailure();
    newState = groupReducer(initialState, action);

    expect(newState).to.equal(initialState);
    expect(newState).to.not.eql([]);
  });

  it('should handle action type CREATE_GROUP_SUCCESS', () => {
    initialState = [{ id: 3, name: 'Politics' }];
    const group = { id: 4, name: 'Architecture' };
    action = createGroupSuccess(group);
    newState = groupReducer(initialState, action);

    expect(newState).to.not.equal(initialState);
    expect(newState.length).to.equal(2);
    expect(newState[0].name).to.equal('Politics');
    expect(newState[1].name).to.equal('Architecture');
  });

  it('should handle action type CREATE_GROUP_FAILURE', () => {
    initialState = [{ id: 3, name: 'Politics' }];
    action = createGroupFailure();
    newState = groupReducer(initialState, action);

    expect(newState).to.equal(initialState);
    expect(newState.length).to.equal(1);
  });
});
