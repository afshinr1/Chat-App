import { GET_COLOR, SET_COLOR } from "../actions/ColorActions";

const initialState = { color: "000000" };

export const ColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLOR:
      return state;
    case SET_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};
