import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

/**
 * Action creator for when getting
 * members of a group is successful
 * @param {array} members
 * @returns {object} action
 */
const getGroupMembersSuccess = members => ({
  type: types.GET_GROUP_MEMBERS_SUCCESS, members
});

/**
 * Action creator for when getting
 * members of a group fails
 * @returns {object} action
 */
const getGroupMembersFailure = () => ({
  type: types.GET_GROUP_MEMBERS_FAILURE
});

/**
 * Action creator for when searching
 * for other users is successful
 * @param {object} users
 * @returns {object} action
 */
const searchUsersSuccess = users => ({
  type: types.SEARCH_USERS_SUCCESS, users
});

/**
 * Action creator for when searching
 * for other users fail'
 * @returns {object} action
 */
const searchUsersFailure = () => ({
  type: types.SEARCH_USERS_FAILURE
});

/**
 * Async action creator to get members of a group
 * @param {number} groupId - id of the group to get its members
 * @returns {Promise} dispatches an action
 */
const getGroupMembers = groupId => dispatch => axios
  .get(`/api/group/${groupId}/users`)
  .then((response) => {
    dispatch(getGroupMembersSuccess(response.data));
  })
  .catch(() => {
    dispatch(getGroupMembersFailure());
  });

/**
 * Async action creator to search for other users
 * @param {string} searchTerm - the search query
 * @param {number} group - members of this group not included in search results
 * @param {number} limit - limit of search results
 * @param {number} offset - the offset value
 * @returns {Promise} dispatches an action
 */
const searchUsers = (searchTerm, group, limit, offset) => (dispatch) => {
  let queryString = `searchTerm=${searchTerm}&group=${group}&limit=${limit}`;
  queryString += `&offset=${offset}`;
  return axios
    .get(`/api/search/users?${queryString}`)
    .then((response) => {
      dispatch(searchUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(searchUsersFailure(error.response.data.message));
    });
};

/**
 * Async action creator to add user to a group
 * @param {number} groupId - group to add user to
 * @param {object} userDetail - details of the user to be added
 * @returns {Promise} axios response
 */
const addUser = (groupId, userDetail) => () => axios
  .post(`/api/group/${groupId}/user`, userDetail)
  .then((response) => {
    toastr.success(response.data.message);
  })
  .catch((error) => {
    toastr.error(error.response);
  });

export {
  getGroupMembers, getGroupMembersSuccess, getGroupMembersFailure,
  searchUsers, searchUsersSuccess, searchUsersFailure, addUser
};
