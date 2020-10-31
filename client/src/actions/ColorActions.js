export const GET_COLOR = "GET_COLOR";
export const SET_COLOR = "SET_COLOR";

export const getColor = () => {
  return { type: GET_COLOR, payload: "" };
};

export const setColor = (color) => {
  return { type: SET_COLOR, payload: color };
};
