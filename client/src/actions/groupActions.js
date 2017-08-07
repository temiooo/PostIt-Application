import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

export function getGroupsSuccess(groups) {
  return { type: types.GET_GROUPS_SUCCESS, groups };
}

export function getGroups(user) {
  debugger;
  return dispatch =>
    axios.get(`/api/user/${user}/groups`)
      .then((response) => {
        debugger;
        toastr.error(response);
        console.log(response);
        debugger;
        dispatch(getGroupsSuccess(response.data));
        debugger;
      })
      .catch((error) => {
        toastr.error(error.response.data.message);
      });
}

