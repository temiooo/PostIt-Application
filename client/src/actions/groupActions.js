import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

const getUserGroupsSuccess = groups => ({
  type: types.GET_USER_GROUPS_SUCCESS, groups
});

const getUserGroupsFailure = () => ({
  type: types.GET_USER_GROUPS_FAILURE
});

const getGroupSuccess = group => ({
  type: types.GET_GROUP_SUCCESS, group
});

const getGroupFailure = () => ({
  type: types.GET_GROUP_FAILURE
});

const createGroupSuccess = group => ({
  type: types.CREATE_GROUP_SUCCESS, group
});

const createGroupFailure = () => ({
  type: types.CREATE_GROUP_FAILURE
});

const updateGroupInfo = group => ({
  type: types.UPDATE_GROUP_INFO, group
});

const editGroupOn = () => ({
  type: types.EDIT_GROUP_ON
});

const editGroupOff = () => ({
  type: types.EDIT_GROUP_OFF
});

const getUserGroups = user => dispatch => axios
  .get(`/api/user/${user}/groups`)
  .then((response) => {
    dispatch(getUserGroupsSuccess(response.data));
  })
  .catch((error) => {
    toastr(error.response.data.message);
    dispatch(getUserGroupsFailure());
  });

const getGroup = id => dispatch => axios
  .get(`/api/group/${id}`)
  .then((response) => {
    dispatch(getGroupSuccess(response.data));
  })
  .catch(() => {
    dispatch(getGroupFailure());
  });

const createGroup = groupName => dispatch => axios
  .post('/api/group', groupName)
  .then((response) => {
    dispatch(createGroupSuccess(response.data.group));
  })
  .catch((error) => {
    dispatch(createGroupFailure());
    toastr.error(error.response.data.message);
  });

const updateGroup = (groupName, groupId, user) => dispatch => axios
  .put(`/api/group/${groupId}`, groupName)
  .then((response) => {
    toastr.success(response.data.message);
    axios.get(`/api/user/${user}/groups`)
      .then((result) => {
        dispatch(getUserGroupsSuccess(result.data));
        dispatch(updateGroupInfo(groupName));
      });
  })
  .catch((error) => {
    dispatch(getUserGroupsFailure());
    toastr.error(error.response.data.message);
  });


export {
  getUserGroups, getUserGroupsSuccess, getUserGroupsFailure,
  getGroup, getGroupSuccess, getGroupFailure, createGroup,
  createGroupSuccess, createGroupFailure, updateGroup,
  updateGroupInfo, editGroupOn, editGroupOff
};
