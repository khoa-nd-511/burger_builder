import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../sharedFn/utilities";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null
};

const purchaseOrder = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  return updateObj(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseOrder(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObj(state, { loading: false });

    case actionTypes.PURCHASE_ORDER_START:
      return updateObj(state, { loading: true });

    case actionTypes.PURCHASE_ORDER_INIT:
      return updateObj(state, { purchased: false });

    case actionTypes.FETCH_ORDERS_START:
      return updateObj(state, { loading: true });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObj(state, {
        orders: action.orders,
        loading: false
      });

    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObj(state, { loading: false, error: action.error });

    default:
      return state;
  }
};

export default reducer;
