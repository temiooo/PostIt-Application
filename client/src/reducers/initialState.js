export default {
  auth: {
    currentUserId: '',
    isAuthenticated: false,
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
  ajaxCallsInProgress: 0
};
