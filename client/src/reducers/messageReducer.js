import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Reducer that handles messages from the current group
 * @param {object} state - initial state
 * @param {object} action - the dispatched action
 * @returns {object} new state of the messages section of the store
 */
const messageReducer = (state = initialState.messages, action) => {
  switch (action.type) {
    case types.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        groupId: action.id,
        groupMessages: action.data
      };

    case types.GET_MESSAGES_FAILURE:
      return state;

    case types.GET_GROUP_SUCCESS:
      return {
        ...state,
        groupName: action.group.name,
      };

    case types.GET_GROUP_FAILURE:
      return {
        ...state,
        groupName: '',
      };

    case types.POST_MESSAGE_SUCCESS:
      return {
        ...state,
        groupMessages: [...state.groupMessages, action.message]
      };

    case types.POST_MESSAGE_FAILURE:
      return state;

    case types.UPDATE_GROUP_INFO:
      return { ...state, groupName: action.group.name };

    default:
      return state;
  }
};

export default messageReducer;
