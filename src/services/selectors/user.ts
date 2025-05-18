import { RootState } from '@store';

export const userSelector = (state: RootState) => state.user;
export const userDataSelector = (state: RootState) => state.user.data;
export const isAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;
export const userRegisterIsLoadingSelector = (state: RootState) =>
  state.user.registerIsLoading;
export const userRegisterErrorSelector = (state: RootState) =>
  state.user.registerError;
export const userLoginIsLoadingSelector = (state: RootState) =>
  state.user.loginIsLoading;
export const userLoginErrorSelector = (state: RootState) =>
  state.user.loginError;
export const userGetIsLoadingSelector = (state: RootState) =>
  state.user.getIsLoading;
export const userGetErrorSelector = (state: RootState) => state.user.getError;
export const userUpdateIsLoadingSelector = (state: RootState) =>
  state.user.updateIsLoading;
export const userUpdateErrorSelector = (state: RootState) =>
  state.user.updateError;
