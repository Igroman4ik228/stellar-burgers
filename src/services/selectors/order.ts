import { RootState } from '@store';

export const orderSelector = (state: RootState) => state.order;
export const newOrderDataSelector = (state: RootState) =>
  state.order.newOrderData;
export const newOrderIsLoadingSelector = (state: RootState) =>
  state.order.newOrderIsLoading;
export const newOrderErrorSelector = (state: RootState) =>
  state.order.newOrderError;
export const orderByNumberDataSelector = (state: RootState) =>
  state.order.orderByNumber;
export const orderByNumberIsLoadingSelector = (state: RootState) =>
  state.order.orderByNumberIsLoading;
export const orderByNumberErrorSelector = (state: RootState) =>
  state.order.orderByNumberError;
