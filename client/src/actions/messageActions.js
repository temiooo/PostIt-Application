import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

export function getMessagesSuccess(id, name, messages) {
  return { type: types.GET_MESSAGES_SUCCESS, id, name, messages };
}

export function postMessageSuccess(message) {
  return { type: types.POST_MESSAGE_SUCCESS, message };
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

export function postMessages(group, message) {
  return dispatch =>
    axios.get(`/api/group/${group.id}/message`, message)
      .then((response) => {
        dispatch(postMessageSuccess(response.data));
      })
      .catch((error) => {
        toastr.error(error);
      });
}

