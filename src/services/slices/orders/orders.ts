import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersState } from './type';

export const initialState: TOrdersState = {
  data: [],
  isLoading: false,
  error: null
};

export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});
