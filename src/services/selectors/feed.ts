import { RootState } from '@store';

export const feedSelector = (state: RootState) => state.feed;
export const ordersFeedSelector = (state: RootState) => state.feed.orders;
export const isLoadingFeedSelector = (state: RootState) => state.feed.isLoading;
export const errorFeedSelector = (state: RootState) => state.feed.error;
