import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrderState } from './type';

export const initialState: TOrderState = {
  newOrderData: null,
  newOrderIsLoading: false,
  newOrderError: null,
  orderByNumber: null,
  orderByNumberIsLoading: false,
  orderByNumberError: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (ingredientIds: string[]) => {
    const { order } = await orderBurgerApi(ingredientIds);
    return order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const { orders } = await getOrderByNumberApi(number);
    return orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.newOrderIsLoading = true;
        state.newOrderError = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.newOrderData = action.payload;
        state.newOrderIsLoading = false;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.newOrderIsLoading = false;
        state.newOrderError =
          action.error.message || 'Ошибка загрузки ингредиентов';
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.orderByNumberIsLoading = true;
        state.orderByNumberError = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload;
        state.orderByNumberIsLoading = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderByNumberIsLoading = false;
        state.orderByNumberError =
          action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});
