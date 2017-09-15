import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

const getGroupMembersSuccess = members => ({
  type: types.GET_GROUP_MEMBERS_SUCCESS, members
});

const searchUsersSuccess = users => ({
  type: types.SEARCH_USERS_SUCCESS, users
});

const searchUsersFailure = () => ({
  type: types.SEARCH_USERS_FAILURE
});

const getGroupMembers = group => dispatch => axios
  .get(`/api/group/${group}/users`)
  .then((response) => {
    dispatch(getGroupMembersSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error.response);
  });


const searchUsers = (query, group, limit, offset) => dispatch => axios
  .get(`/api/search/users?q=${query}&group=${group}
    &limit=${limit}&offset=${offset}`)
  .then((response) => {
    dispatch(searchUsersSuccess(response.data));
  })
  .catch((error) => {
    dispatch(searchUsersFailure(error.response.data.message));
  });


const addUser = (group, userDetail) => dispatch => axios
  .post(`/api/group/${group}/user`, userDetail)
  .then((response) => {
    toastr.success(response.data.message);
  })
  .catch((error) => {
    toastr.error(error.response);
  });


export { getGroupMembers, getGroupMembersSuccess, searchUsers,
  searchUsersSuccess, searchUsersFailure, addUser };
