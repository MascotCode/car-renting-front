import { SET_LOGIN } from "../types";

const initialState = {
  email: '',
  token: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOGIN:
      console.log(action);
      return {
        ...state,
        email: payload?.email,
        token: payload?.token,
      };

    default:
      return state;
  }
}
