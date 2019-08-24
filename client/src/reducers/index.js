import { combineReducers } from "redux";

import auth from './authRd';
import cart from './cartRd';
import menu from './menuRd';
import order from './orderRd';
import payment from './paymentRd';
import workOrder from './workOrderRd';

export default combineReducers({
  auth,
  menu,
  order,
  cart,
  payment,
  workOrder,
});
