export default {
  auth: {
    isAuthenticated: false,
    currentUser: {}
  },
  groups: [],
  messages: {
    groupId: '',
    groupName: '',
    groupMessages: []
  },
  users: {
    members: [],
    nonMembers: [],
    pagination: {}
  },
  ajaxCallsInProgress: 0,
  editGroupStatus: false
};
