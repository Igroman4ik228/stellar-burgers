import { RootState } from '../store';

export const ordersSelector = (state: RootState) => state.orders;
export const ordersDataSelector = (state: RootState) => state.orders.data;
export const ordersIsLoadingSelector = (state: RootState) =>
  state.orders.isLoading;
export const ordersErrorSelector = (state: RootState) => state.orders.error;

export const ordersDataByNumberSelector =
  (number: number) => (state: RootState) => {
    const fromOrders = state.orders.data.find((item) => item.number === number);
    if (fromOrders) return fromOrders;

    const fromFeed = state.feed.orders.find((item) => item.number === number);
    if (fromFeed) return fromFeed;

    if (state.order.orderByNumber?.number === number)
      return state.order.orderByNumber;

    return null;
  };
