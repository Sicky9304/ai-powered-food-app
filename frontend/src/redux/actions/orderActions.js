import api from "../../utils/api";

import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  paymentRequest,
  paymentSuccess,
  paymentFail,
  myOrdersRequest,
  myOrdersSuccess,
  myOrdersFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
} from "../slices/orderSlice";

// Create order
export const createOrder = (session_id) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await api.post(
      "/v1/eats/orders/new",
      { session_id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response?.data?.message));
  }
};

// Payment
export const payment = (items, restaurant, couponCode) => async (dispatch) => {
  try {
    dispatch(paymentRequest());
    const { data } = await api.post(
      "/v1/payment/process",
      { items, restaurant, couponCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.url) {
      window.location.assign(data.url);
    }

    dispatch(paymentSuccess());
  } catch (error) {
    dispatch(paymentFail(error.response?.data?.message));
  }
};

// My orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch(myOrdersRequest());
    const { data } = await api.get("/v1/eats/orders/me/myOrders");

    dispatch(myOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(myOrdersFail(error.response?.data?.message));
  }
};

// Order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailsRequest());
    const { data } = await api.get(`/v1/eats/orders/${id}`);

    dispatch(orderDetailsSuccess(data.order));
  } catch (error) {
    dispatch(orderDetailsFail(error.response?.data?.message));
  }
};

// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
  try {
    dispatch(myOrdersRequest());
    const { data } = await api.get("/v1/eats/orders/admin/orders");
    dispatch(myOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(myOrdersFail(error.response?.data?.message));
  }
};

// Update Order Status - ADMIN
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    const { data } = await api.put(
      `/v1/eats/orders/admin/orders/${id}`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(orderDetailsSuccess(data.order));
  } catch (error) {
    dispatch(orderDetailsFail(error.response?.data?.message));
  }
};
