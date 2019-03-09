import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchasingBurger = () => {
  return {
    type: actionTypes.PURCHASE_ORDER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return async dispatch => {
    dispatch(purchasingBurger());
    try {
      const response = await axios.post("/orders.json?auth=" + token, orderData);
      if ((await response.status) === 200) {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      }
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_ORDER_INIT
  };
};


export const fetchOdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOdersFail = error => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error
  }
}

export const fetchOdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return async dispatch => {
    dispatch(fetchOdersStart())
    try {
      const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
      const res = await axios.get("/orders.json" + queryParams);
      if (res && res.status === 200) {
        const fetchedOrders = [];
        for (const key in res.data) {
          const o = res.data[key];
          fetchedOrders.push({
            ...o,
            id: key
          });
        } 
        await dispatch(fetchOdersSuccess(fetchedOrders))
      }
    } catch (error) {
      await dispatch(fetchOdersFail(error.response.data.error))
    }
  }
}