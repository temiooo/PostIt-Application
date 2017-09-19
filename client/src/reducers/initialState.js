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
  currentUserInfo: {
    username: '',
    email: '',
    joinedOn: null,
  },
  ajaxCallsInProgress: 0,
  editGroupStatus: false
};
