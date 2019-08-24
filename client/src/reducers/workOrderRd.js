import { FETCH_CART_ORDERS, SET_TASK_STATUS} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SET_TASK_STATUS:
        return action.payload || null;
    case FETCH_CART_ORDERS:
        return action.payload || null;
    default:
        return state;
  }
};
