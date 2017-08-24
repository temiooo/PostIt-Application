import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

const getGroupsSuccess = groups => ({
  type: types.GET_GROUPS_SUCCESS, groups
});

const createGroupSuccess = group => ({
  type: types.CREATE_GROUP_SUCCESS, group
});

const getGroups = user => dispatch => axios
  .get(`/api/user/${user}/groups`)
  .then((response) => {
    dispatch(getGroupsSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error);
  });


const createGroup = name => dispatch => axios
  .post('/api/group', name)
  .then((response) => {
    dispatch(createGroupSuccess(response.data.group));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


export { getGroups, getGroupsSuccess,
  createGroup, createGroupSuccess };
