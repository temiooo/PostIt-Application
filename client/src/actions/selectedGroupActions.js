import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';
import {
  beginAjaxCall,
  ajaxCallSuccess,
  ajaxCallError
} from './ajaxStatusActions';
import {
  getUserGroupsSuccess,
  getUserGroupsFailure
} from './groupListActions';

/**
 * Action creator that sets a particular group
 * as the current group in the store
 *
 * @param {object} group - group data
 *
 * @returns {object} action
 */
const getGroupSuccess = group => ({
  type: types.GET_GROUP_SUCCESS, group
});

/** Action creator that signifies an error occured
 * while fetching the current group
 *
 * @returns {object} action
 */
const getGroupFailure = () => ({
  type: types.GET_GROUP_FAILURE
});

/**
 * Action creator that updates a group name after it has been changed
 *
 * @param {object} group - group data
 *
 * @returns {object} action
 */
const editGroupSuccess = group => ({
  type: types.EDIT_GROUP_SUCCESS, group
});

/** Action creator that signifies an error occured
 * while trying to edit a group
 *
 * @returns {object} action
 */
const editGroupFailure = () => ({
  type: types.EDIT_GROUP_FAILURE
});

/** Action creator that sets edit group status to true in the store
 *
 * @returns {object} action
 */
const editGroupOn = () => ({
  type: types.EDIT_GROUP_ON
});

/**
 * Action creator that sets edit group status to false in the store
 *
 * @returns {object} action
 */
const editGroupOff = () => ({
  type: types.EDIT_GROUP_OFF
});


/**
 * Action creator to signify messages from a group were retrieved successfully
 *
 * @param {number} id - id of the current group
 * @param {array} data - message data grom the current group
 *
 * @returns {object} action
 */
const getMessagesSuccess = (id, data) => ({
  type: types.GET_MESSAGES_SUCCESS, id, data
});

/**
 * Action creator to signify failed retrieval of messages from a group
 *
 * @returns {object} action
 */
const getMessagesFailure = () => ({
  type: types.GET_MESSAGES_FAILURE
});

/**
 * Action creator to signify a message has been sent successfully
 *
 * @param {object} message - new message
 *
 * @returns {object} action
 */
const postMessageSuccess = message => ({
  type: types.POST_MESSAGE_SUCCESS, message
});

/**
 * Action creator that signifies failure to send message
 *
 * @returns {object} action
 */
const postMessageFailure = () => ({
  type: types.POST_MESSAGE_FAILURE
});

/**
 * Async action creator to get details of the current group
 *
 * @param {number} id - id of the current group
 *
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
 * Async action creator to edit a group
 *
 * @param {object} groupName - new name of the group
 * @param {number} groupId - id of the group whose name was changed
 * @param {number} userId - the id of the user changing the group's name
 *
 * @returns {Promise} dispatches an action
 */
const editGroup = (groupName, groupId, userId) => dispatch => axios
  .put(`/api/group/${groupId}`, groupName)
  .then((response) => {
    toastr.success(response.data.message);
    return axios.get(`/api/user/${userId}/groups`);
  })
  .then((result) => {
    dispatch(getUserGroupsSuccess(result.data));
    dispatch(editGroupSuccess(groupName));
  })
  .catch((error) => {
    dispatch(getUserGroupsFailure());
    dispatch(editGroupFailure());
    toastr.error(error.response.data.message);
  });

/**
 * Async action creator to get a list of messages
 *
 * @param {number} groupId - id of the group to retrieve messages from
 *
 * @returns {Promise} dispatches an action
 */
const getMessages = groupId => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
    .get(`/api/group/${groupId}/messages`)
    .then((response) => {
      const data = response.data;
      dispatch(getMessagesSuccess(groupId, data));
      dispatch(ajaxCallSuccess());
    })
    .catch((error) => {
      dispatch(ajaxCallError());
      dispatch(getMessagesFailure());
      toastr.error(error.response.data.message);
    });
};

/**
 * Async action creator to post a new message
 *
 * @param {number} id - id of the group to post the message to
 * @param {object} message - details of the new message
 *
 * @returns {Promise} dispatches an action
 */
const postMessage = (id, message) => dispatch => axios
  .post(`/api/group/${id}/message`, message)
  .then((response) => {
    dispatch(postMessageSuccess(response.data.message));
  })
  .catch((error) => {
    dispatch(postMessageFailure());
    toastr.error(error.response.data.message);
  });

export {
  getGroup, getGroupSuccess, getGroupFailure,
  editGroup, editGroupSuccess, editGroupFailure,
  getMessages, getMessagesSuccess, getMessagesFailure,
  postMessage, postMessageSuccess, postMessageFailure,
  editGroupOn, editGroupOff,
};
