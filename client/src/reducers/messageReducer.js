import * as types from '../actions/actionTypes';
import initialState from './initialState';

const messageReducer = (state = initialState.messages, action) => {
  switch (action.type) {
    case types.GET_MESSAGES_SUCCESS:
      return {
        groupId: action.id,
        groupName: action.data.group.name,
        groupMessages: action.data.messages
      };

    case types.POST_MESSAGE_SUCCESS:
      return {
        ...state,
        groupMessages: [...state.groupMessages, action.message]
      };

    case types.UPDATE_GROUP_INFO:
      return { ...state, groupName: action.group.name };

    default:
      return state;
  }
};

export default messageReducer;
