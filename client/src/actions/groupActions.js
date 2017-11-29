import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

/**
 * Action creator for when the list of groups a user
 * belongs to is retrieved successfully
 * @param {array} groups - list of group user belongs to
 * @returns {object} action
 */
const getUserGroupsSuccess = groups => ({
  type: types.GET_USER_GROUPS_SUCCESS, groups
});

/**
 * Action creator for failed retrieval of the
 * list of groups a user belongs to
 * @returns {object} action
 */
const getUserGroupsFailure = () => ({
  type: types.GET_USER_GROUPS_FAILURE
});

/**
 * Action creator that sets a particular group
 * as the current group in the store
 * @param {object} group - group data
 * @returns {object} action
 */
const getGroupSuccess = group => ({
  type: types.GET_GROUP_SUCCESS, group
});

/** Action creator that signifies an error occured
 * while fetching the current group
 * @returns {object} action
 */
const getGroupFailure = () => ({
  type: types.GET_GROUP_FAILURE
});

/**
 * Action creator that signifies a group
 * has been created successfully
 * @param {object} group - group data
 * @returns {object} action
 */
const createGroupSuccess = group => ({
  type: types.CREATE_GROUP_SUCCESS, group
});

/**
 * Action creator that signifies an error
 * occured while creating a group
 * @returns {object} action
 */
const createGroupFailure = () => ({
  type: types.CREATE_GROUP_FAILURE
});

/**
 * Action creator that updates a group
 * name after it has been changed
 * @param {object} group - group data
 * @returns {object} action
 */
const updateGroupInfo = group => ({
  type: types.UPDATE_GROUP_INFO, group
});

/** Action creator that sets edit group
 * status to true in the store
 * @returns {object} action
 */
const editGroupOn = () => ({
  type: types.EDIT_GROUP_ON
});

/**
 * Action creator that sets edit group
 * status to false in the store
 * @returns {object} action
 */
const editGroupOff = () => ({
  type: types.EDIT_GROUP_OFF
});

/**
 * Async action creator to get the
 * list of groups a user belongs to
 * @param {number} id - id of the current user
 * @returns {Promise} dispatches an action
 */
const getUserGroups = id => dispatch => axios
  .get(`/api/user/${id}/groups`)
  .then((response) => {
    dispatch(getUserGroupsSuccess(response.data));
  })
  .catch(() => {
    dispatch(getUserGroupsFailure());
  });

/**
 * Async action creator to get details of the current group
 * @param {number} id - id of the current group
 * @returns {Promise} dispatches an action
 */
const getGroup = id => dispatch => axios
  .get(`/api/group/${id}`)
  .then((response) => {
    dispatch(getGroupSuccess(response.data));
  })
  .catch(() => {
    dispatch(getGroupFailure());
  });

/**
 * Async action creator to create a new group
 * @param {object} groupName - name of the group to be created
 * @returns {Promise} dispatches an action
 */
const createGroup = groupName => dispatch => axios
  .post('/api/group', groupName)
  .then((response) => {
    dispatch(createGroupSuccess(response.data.group));
  })
  .catch((error) => {
    dispatch(createGroupFailure());
    toastr.error(error.response.data.message);
  });

/**
 * Async action creator to update a group's name
 * @param {object} groupName - new name of the group
 * @param {number} groupId - id of the group whose name was changed
 * @param {number} userId - the id of the user changing the group's name
 * @returns {Promise} dispatches an action
 */
const updateGroup = (groupName, groupId, userId) => dispatch => axios
  .put(`/api/group/${groupId}`, groupName)
  .then((response) => {
    toastr.success(response.data.message);
    return axios.get(`/api/user/${userId}/groups`);
  })
  .then((result) => {
    dispatch(getUserGroupsSuccess(result.data));
    dispatch(updateGroupInfo(groupName));
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
