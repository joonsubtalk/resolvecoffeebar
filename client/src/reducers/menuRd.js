import { FETCH_MENU_ITEMS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MENU_ITEMS:
      return action.payload || null;
    default:
      return state;
  }
};
