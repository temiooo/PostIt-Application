import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

export function getGroupsSuccess(groups) {
  return { type: types.GET_GROUPS_SUCCESS, groups };
}

export function createGroupSuccess(group) {
  return { type: types.CREATE_GROUP_SUCCESS, group };
}

export function getGroups(user) {
  return dispatch =>
    axios.get(`/api/user/${user}/groups`)
      .then((response) => {
        dispatch(getGroupsSuccess(response.data));
      })
      .catch((error) => {
        toastr.error(error);
      });
}

export function createGroup(name) {
  return dispatch =>
    axios.post('/api/group', name)
      .then((response) => {
        dispatch(createGroupSuccess(response.data.group));
      })
      .catch((error) => {
        toastr.error(error.response.data.message);
      });
}

