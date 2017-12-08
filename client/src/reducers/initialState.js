export default {
  auth: {
    isAuthenticated: false,
    currentUser: {}
  },
  groupList: [],
  selectedGroup: {
    groupId: '',
    groupName: '',
    groupMessages: [],
    editGroupStatus: false
  },
  users: {
    members: [],
    nonMembers: [],
    pagination: {}
  },
  ajaxCallsInProgress: 0,
};
