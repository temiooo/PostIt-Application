import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

const getGroupMembersSuccess = members => ({
  type: types.GET_GROUP_MEMBERS_SUCCESS, members
});

const getGroupMembersFailure = () => ({
  type: types.GET_GROUP_MEMBERS_FAILURE
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
  .catch(() => {
    dispatch(getGroupMembersFailure());
  });


const searchUsers = (searchTerm, group, limit, offset) => (dispatch) => {
  let queryString = `searchTerm=${searchTerm}&group=${group}&limit=${limit}`;
  queryString += `&offset=${offset}`;
  return axios
    .get(`/api/search/users?${queryString}`)
    .then((response) => {
      dispatch(searchUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(searchUsersFailure(error.response.data.message));
    });
};

const addUser = (group, userDetail) => () => axios
  .post(`/api/group/${group}/user`, userDetail)
  .then((response) => {
    toastr.success(response.data.message);
  })
  .catch((error) => {
    toastr.error(error.response);
  });

export {
  getGroupMembers, getGroupMembersSuccess, getGroupMembersFailure,
  searchUsers, searchUsersSuccess, searchUsersFailure, addUser
};
