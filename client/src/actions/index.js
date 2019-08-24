import { authRef } from '../configs/fire';
import {
    FETCH_USER,
    FETCH_MENU_ITEMS,
    SET_MENU_ITEM,
    SET_MENU_ITEM_TYPE,
    SET_MENU_ITEM_OPTION,
    ADD_CURRENT_ORDER_TO_CART,
    POP_CART_ORDER,
    MODIFY_ORDER,
    SET_PAYMENT_INFO,
    SET_TASK_STATUS,
    FETCH_CART_ORDERS,
    SUCCESSFUL_SUBMIT_ORDER,
} from '../actions/types';
import { googleProvider, facebookProvider, menuRef, ordersRef } from "../configs/fire";
import { IN_PROGRESS, DONE } from '../configs/constants';

// TODO: ONLY FOR AUTH USERS
export const listenCartOrders = () => async dispatch => {
    ordersRef.orderByChild('orderSubmitTimestamp').on('value', async snapshot => {
        let orderedSnapshot = [];
        snapshot.forEach(child => {
            const newObj = Object.assign({}, child.val(), {id: child.key})
            orderedSnapshot.push(newObj)
        });

        dispatch({
            type: FETCH_CART_ORDERS,
            payload: orderedSnapshot,
        })
    })
}

export const setTaskStatus = (uuid, status) => async dispatch => {
    // const {status} = workOrder;

    const updatedOrders = await ordersRef
        .child(uuid)
        .update(status)

    // dispatch({
    //     type: SET_TASK_STATUS,
    //     payload: updatedOrders,
    // })
}

// TODO: END AUTH USERES

export const submitCartOrder = (uuid, order) => dispatch => {
    ordersRef
        .child(uuid)
        .set(order);

    dispatch({
        type: SUCCESSFUL_SUBMIT_ORDER,
    })
}

export const setPaymentInfo = (payment) => dispatch => {
    dispatch({
        type: SET_PAYMENT_INFO,
        payload: payment,
    })
}

export const popCart = (cart) => dispatch => {
    dispatch({
        type: POP_CART_ORDER,
        payload: cart
    })
}

export const modifyOrder = (order) => dispatch => {
    dispatch({
        type: MODIFY_ORDER,
        payload: order
    })
}

export const addCurrentOrderToCart = (order) => dispatch => {
    dispatch({
        type: ADD_CURRENT_ORDER_TO_CART,
        payload: order
    })
}

export const setMenuItemOption = (type) => dispatch => {
    dispatch({
        type: SET_MENU_ITEM_OPTION,
        payload: type,
    })
}

export const setMenuItemType = (type) => dispatch => {
    dispatch({
        type: SET_MENU_ITEM_TYPE,
        payload: type,
    })
}

export const setMenuItem = (type) => dispatch => {
    dispatch({
        type: SET_MENU_ITEM,
        payload: type,
    })
}

export const addMenuItem = (uid, item) => dispatch => {
    menuRef
        .child(uid)
        .set(item)
}

export const getMenuItems = () => async dispatch => {

    menuRef.orderByChild('order').once('value', async snapshot => {
        let orderedSnapshot = [];
        snapshot.forEach(child => {
            const newObj = Object.assign({}, child.val(), {id: child.key})
            orderedSnapshot.push(newObj)
        });

        dispatch({
            type: FETCH_MENU_ITEMS,
            payload: orderedSnapshot,
        })
    });
}

export const signIn = (provider) => dispatch => {
  const providerStrategy = (provider === 'FACEBOOK')
    ? facebookProvider
    : googleProvider;

  authRef
    .signInWithPopup(providerStrategy)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: FETCH_USER,
          payload: user
        });
      } else {
        dispatch({
          type: FETCH_USER,
          payload: null
        });
      }
  })
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};
