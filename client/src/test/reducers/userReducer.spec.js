import { expect } from 'chai';
import userReducer from '../../reducers/userReducer';
import initialState from '../../reducers/initialState';
import {
  getGroupMembersSuccess, getGroupMembersFailure,
  searchUsersSuccess, searchUsersFailure
} from '../../actions/userActions';

let action;
let newState;

describe('User Reducer', () => {
  it('should return the initial state for unknown action type', () => {
    action = {
      type: null
    };
    newState = userReducer(initialState.users, action);

    expect(newState).to.equal(initialState.users);
    expect(newState.members.length).to.equal(0);
    expect(newState.nonMembers.length).to.equal(0);
  });

  it('should handle action type GET_GROUP_MEMBERS_SUCCESS', () => {
    const members = [{ id: 1, username: 'hermione' }];
    action = getGroupMembersSuccess(members);
    newState = userReducer(initialState.users, action);

    expect(newState.members.length).to.equal(1);
    expect(newState.members.username).to.equal(members.username);
    expect(newState.nonMembers.length).to.equal(0);
  });

  it('should handle action type GET_GROUP_MEMBERS_FAILURE', () => {
    action = getGroupMembersFailure();
    newState = userReducer(initialState.users, action);

    expect(newState).to.equal(initialState.users);
  });

  it('should handle action type SEARCH_USERS_SUCCESS', () => {
    const users = {
      users: [{ id: 5, username: 'amanda' }, { id: 7, username: 'sophiat' }],
      pagination: { page: 1, pageCount: 2, pageSize: 2, totalCount: 3 }
    };
    action = searchUsersSuccess(users);
    newState = userReducer(initialState.users, action);

    expect(newState.nonMembers.length).to.equal(2);
    expect(newState.nonMembers[0].username).to.equal(users.users[0].username);
    expect(newState.nonMembers[1].username).to.equal(users.users[1].username);
    expect(newState.members.length).to.equal(0);
    expect(newState.pagination).to.equal(users.pagination);
  });

  it('should handle action type SEARCH_USERS_FAILURE', () => {
    action = searchUsersFailure();
    newState = userReducer(initialState.users, action);

    expect(newState).to.equal(initialState.users);
  });
});
