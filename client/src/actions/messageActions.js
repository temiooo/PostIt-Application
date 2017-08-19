import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

export function getMessagesSuccess(id, name, messages) {
  return { type: types.GET_MESSAGES_SUCCESS, id, name, messages };
}

export function postMessageSuccess(messages) {
  return { type: types.POST_MESSAGE_SUCCESS, messages };
}

export function getMessages(group) {
  return dispatch =>
    axios.get(`/api/group/${group.id}/messages`)
      .then((response) => {
        const messages = response.data.messages;
        dispatch(getMessagesSuccess(group.id, group.name, messages));
      })
      .catch((error) => {
        toastr.error(error);
      });
}

export function postMessage(id, message) {
  return dispatch =>
    axios.post(`/api/group/${id}/message`, message)
      .then(() => {
        axios.get(`/api/group/${id}/messages`)
          .then((response) => {
            dispatch(postMessageSuccess(response.data));
          });
      })
      .catch((error) => {
        toastr.error(error);
      });
}

