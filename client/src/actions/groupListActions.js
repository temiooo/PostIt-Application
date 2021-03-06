import axios from 'axios';
import * as types from './actionTypes';
import { checkError } from '../actions/authActions';
/**
 * Action creator for when the list of groups a user
 * belongs to is retrieved successfully
 *
 * @param {array} groups - list of group user belongs to
 *
 * @returns {Object} action
 */
const getUserGroupsSuccess = groups => ({
  type: types.GET_USER_GROUPS_SUCCESS, groups
});

/**
 * Action creator for failed retrieval of the
 * list of groups a user belongs to
 *
 * @returns {Object} action
 */
const getUserGroupsFailure = () => ({
  type: types.GET_USER_GROUPS_FAILURE
});

/**
 * Action creator that signifies a group
 * has been created successfully
 *
 * @param {Object} group - group data
 *
 * @returns {Object} action
 */
const createGroupSuccess = group => ({
  type: types.CREATE_GROUP_SUCCESS, group
});

/**
 * Action creator that signifies an error
 * occured while creating a group
 *
 * @returns {Object} action
 */
const createGroupFailure = () => ({
  type: types.CREATE_GROUP_FAILURE
});

/**
 * Async action creator to get the
 * list of groups a user belongs to
 *
 * @param {number} id - id of the current user
 *
 * @returns {Promise} dispatches an action
 */
const getUserGroups = id => dispatch => axios
  .get(`/api/user/${id}/groups`)
  .then((response) => {
    dispatch(getUserGroupsSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getUserGroupsFailure());
    dispatch(checkError(error.response.data.message));
  });

/**
 * Async action creator to create a new group
 *
 * @param {Object} groupName - name of the group to be created
 *
 * @returns {Promise} dispatches an action
 */
const createGroup = groupName => dispatch => axios
  .post('/api/group', groupName)
  .then((response) => {
    dispatch(createGroupSuccess(response.data.group));
  })
  .catch((error) => {
    dispatch(createGroupFailure());
    dispatch(checkError(error.response.data.message));
  });

export {
  getUserGroups, getUserGroupsSuccess, getUserGroupsFailure,
  createGroup, createGroupSuccess, createGroupFailure
};
