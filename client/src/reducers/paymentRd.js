import { SET_PAYMENT_INFO, SUCCESSFUL_SUBMIT_ORDER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PAYMENT_INFO:
      return action.payload || null;
    case SUCCESSFUL_SUBMIT_ORDER:
      return {};
    default:
      return state;
  }
};
