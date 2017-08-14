import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

export function getGroupsSuccess(groups) {
  return { type: types.GET_GROUPS_SUCCESS, groups };
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

