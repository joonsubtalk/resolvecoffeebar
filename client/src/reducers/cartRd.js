import { ADD_CURRENT_ORDER_TO_CART, POP_CART_ORDER, SUCCESSFUL_SUBMIT_ORDER } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case POP_CART_ORDER:
      return action.payload || null;
    case ADD_CURRENT_ORDER_TO_CART:
      return action.payload || null;
    case SUCCESSFUL_SUBMIT_ORDER:
      return [];
    default:
      return state;
  }
};
