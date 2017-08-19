import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

export function getGroupMembersSuccess(members) {
  return { type: types.GET_GROUP_MEMBERS_SUCCESS, members };
}

export function searchUsersSuccess(users) {
  return { type: types.SEARCH_USERS_SUCCESS, users };
}

export function searchUsersFailure() {
  return { type: types.SEARCH_USERS_FAILURE };
}

export function getGroupMembers(group) {
  return dispatch =>
    axios.get(`/api/group/${group}/users`)
      .then((response) => {
        dispatch(getGroupMembersSuccess(response.data));
      })
      .catch((error) => {
        toastr.error(error.response);
      });
}

export function searchUsers(query, group, limit, offset) {
  return (dispatch) => {
    const queryString =
   `q=${query}&group=${group}&limit=${limit}&offset=${offset}`;
    axios.get(`/api/search/users?${queryString}`)
      .then((response) => {
        dispatch(searchUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(searchUsersFailure(error.response.data.message));
      });
  };
}

export function addUser(group, userDetail) {
  return dispatch =>
    axios.post(`/api/group/${group}/user`, userDetail)
      .then((response) => {
        toastr.success(response.data.message);
      })
      .catch((error) => {
        toastr.error(error.response);
      });
}
