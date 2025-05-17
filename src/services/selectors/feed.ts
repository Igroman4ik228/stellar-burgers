import { RootState } from '@store';

export const feedSelector = (state: RootState) => state.feed;
export const feedOrdersSelector = (state: RootState) => state.feed.orders;
export const feedTotalSelector = (state: RootState) => state.feed.total;
export const feedTotalTodaySelector = (state: RootState) =>
  state.feed.totalToday;
export const feedOrderByNumberSelector =
  (number: number) => (state: RootState) =>
    state.feed.orders.find((item) => item.number === number);
export const feedIsLoadingSelector = (state: RootState) => state.feed.isLoading;
export const feedErrorSelector = (state: RootState) => state.feed.error;
