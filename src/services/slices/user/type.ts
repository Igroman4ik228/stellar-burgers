import { TUser } from '@utils-types';

export type TUserState = {
  data: TUser | null;
  isAuthChecked: boolean;
  registerIsLoading: boolean;
  registerError: string | null;
  loginIsLoading: boolean;
  loginError: string | null;
  getIsLoading: boolean;
  getError: string | null;
  updateIsLoading: boolean;
  updateError: string | null;
};
