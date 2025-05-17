import { RootState } from '../store';

export const ordersSelector = (state: RootState) => state.orders;
export const ordersDataSelector = (state: RootState) => state.orders.orders;
export const ordersIsLoadingSelector = (state: RootState) =>
  state.orders.isLoading;
export const ordersErrorSelector = (state: RootState) => state.orders.error;
