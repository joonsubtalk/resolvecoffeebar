import { SET_MENU_ITEM_TYPE,
    SET_MENU_ITEM,
    SET_MENU_ITEM_OPTION,
    MODIFY_ORDER,
    ADD_CURRENT_ORDER_TO_CART,
    SUCCESSFUL_SUBMIT_ORDER} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_MENU_ITEM_OPTION:
        return Object.assign({}, state, action.payload);
    case SET_MENU_ITEM_TYPE:
        return Object.assign({}, state, action.payload);
    case SET_MENU_ITEM:
        return Object.assign({}, state, action.payload);
    case ADD_CURRENT_ORDER_TO_CART:
        return {};
    case MODIFY_ORDER:
        return Object.assign({}, state, action.payload);
    case SUCCESSFUL_SUBMIT_ORDER:
      return {};
    default:
      return state;
  }
};
