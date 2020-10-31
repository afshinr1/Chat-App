import { SET_USERS } from "../actions/UsersActions";

const initialState = { users: [] };

export const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
