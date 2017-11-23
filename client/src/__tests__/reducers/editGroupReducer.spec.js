import { expect } from 'chai';
import editGroupReducer from '../../reducers/editGroupReducer';
import initialState from '../../reducers/initialState';
import { editGroupOn, editGroupOff } from '../../actions/groupActions';

let action;
let newState;

describe('Edit Group Reducer', () => {
  it('should return initial state for unknown action type', () => {
    action = {
      type: 'UNKNOWN_ACTION'
    };
    newState = editGroupReducer(initialState.editGroupStatus, action);

    expect(newState).to.equal(initialState.editGroupStatus);
  });

  it('should handle action type EDIT_GROUP_ON', () => {
    action = editGroupOn();
    newState = editGroupReducer(initialState.editGroupStatus, action);

    expect(newState).to.equal(true);
    expect(newState).to.not.equal(initialState.editGroupStatus);
  });

  it('should handle action type EDIT_GROUP_OFF', () => {
    action = editGroupOff();
    newState = editGroupReducer(initialState.editGroupStatus, action);

    expect(newState).to.equal(false);
  });
});
