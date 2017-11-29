import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';
import {
  beginAjaxCall, ajaxCallSuccess,
  ajaxCallError
} from './ajaxStatusActions';

/**
 * Action creator to signify messages from
 * a group were retrieved successfully
 * @param {number} id - id of the current group
 * @param {array} data - message data grom the current group
 * @returns {object} action
 */
const getMessagesSuccess = (id, data) => ({
  type: types.GET_MESSAGES_SUCCESS, id, data
});

/**
 * Action creator to signify failed
 * retrieval of messages from a group
 * @returns {object} action
 */
const getMessagesFailure = () => ({
  type: types.GET_MESSAGES_FAILURE
});

/**
 * Action creator to signify a message
 * has been sent successfully
 * @param {object} message - new message
 * @returns {object} action
 */
const postMessageSuccess = message => ({
  type: types.POST_MESSAGE_SUCCESS, message
});

/**
 * Action creator that signifies
 * failure to send message
 * @returns {object} action
 */
const postMessageFailure = () => ({
  type: types.POST_MESSAGE_FAILURE
});

/**
 * Async action creator to get a list of messages
 * @param {number} groupId - id of the group to retrieve messages from
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
 * @param {number} id - id of the group to post the message to
 * @param {object} message - details of the new message
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
  getMessages, getMessagesSuccess, getMessagesFailure,
  postMessage, postMessageSuccess, postMessageFailure
};
