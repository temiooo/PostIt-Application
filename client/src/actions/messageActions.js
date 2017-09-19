import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallSuccess,
  ajaxCallError } from './ajaxStatusActions';

const getMessagesSuccess = (id, data) => ({
  type: types.GET_MESSAGES_SUCCESS, id, data
});

const postMessageSuccess = message => ({
  type: types.POST_MESSAGE_SUCCESS, message
});


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
      toastr.error(error);
    });
};

const postMessage = (id, message) => dispatch => axios
  .post(`/api/group/${id}/message`, message)
  .then((response) => {
    dispatch(postMessageSuccess(response.data.message));
  })
  .catch((error) => {
    toastr.error(error);
  });


export { getMessages, getMessagesSuccess, postMessage,
  postMessageSuccess };
