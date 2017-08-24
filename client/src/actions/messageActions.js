import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

const getMessagesSuccess = (id, name, messages) => ({
  type: types.GET_MESSAGES_SUCCESS, id, name, messages
});

const postMessageSuccess = messages => ({
  type: types.POST_MESSAGE_SUCCESS, messages
});

const updateGroupInfo = group => ({
  type: types.UPDATE_GROUP_INFO, group
});

const getMessages = group => dispatch => axios
  .get(`/api/group/${group.id}/messages`)
  .then((response) => {
    const messages = response.data.messages;
    dispatch(getMessagesSuccess(group.id, group.name, messages));
  })
  .catch((error) => {
    toastr.error(error);
  });


const postMessage = (id, message) => dispatch => axios
  .post(`/api/group/${id}/message`, message)
  .then(() => {
    axios.get(`/api/group/${id}/messages`)
      .then((response) => {
        dispatch(postMessageSuccess(response.data.messages));
      });
  })
  .catch((error) => {
    toastr.error(error);
  });


export { getMessages, getMessagesSuccess, postMessage,
  postMessageSuccess, updateGroupInfo };
