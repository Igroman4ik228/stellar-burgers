import { RootState } from '@store';

export const feedSelector = (state: RootState) => state.feed;
export const ordersFeedSelector = (state: RootState) => state.feed.orders;
export const totalFeedSelector = (state: RootState) => state.feed.total;
export const totalTodayFeedSelector = (state: RootState) =>
  state.feed.totalToday;
export const isLoadingFeedSelector = (state: RootState) => state.feed.isLoading;
export const errorFeedSelector = (state: RootState) => state.feed.error;
