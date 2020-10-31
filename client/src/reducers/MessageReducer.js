import { ADD_MESSAGE, UPDATE_MESSAGES } from "../actions/MessageActions";
const initialState = { messages: [] };

export const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case UPDATE_MESSAGES:
      return {
        ...state,
        messages: [state.messages[0], ...action.payload],
      };

    default:
      return state;
  }
};
