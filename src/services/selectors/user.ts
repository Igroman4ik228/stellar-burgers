import { RootState } from '@store';

export const userSelector = (state: RootState) => state.user;
export const userDataSelector = (state: RootState) => state.user.user;
export const isAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;
