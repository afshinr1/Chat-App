export const ADD_MESSAGE = "ADD_MESSAGE";
export const UPDATE_MESSAGES = "UPDATE_MESSAGES";

export const addMessage = (message) => {
  return { type: ADD_MESSAGE, payload: message };
};

export const updateMessages = (messages) => {
  return { type: UPDATE_MESSAGES, payload: messages };
};
