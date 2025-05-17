import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  registerIsLoading: boolean;
  registerError: string | null;
  loginIsLoading: boolean;
  loginError: string | null;
  updateIsLoading: boolean;
  updateError: string | null;
  getIsLoading: boolean;
  getError: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  registerIsLoading: false,
  registerError: null,
  loginIsLoading: false,
  loginError: null,
  updateIsLoading: false,
  updateError: null,
  getIsLoading: false,
  getError: null
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const { user, refreshToken, accessToken } = await registerUserApi(data);
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const { user } = await loginUserApi(data);
    return user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const { user } = await getUserApi();
  return user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const { user } = await updateUserApi(data);
    return user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(userSlice.actions.authChecked());
      });
    } else {
      dispatch(userSlice.actions.authChecked());
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.user = initialState.user;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerIsLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerIsLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerIsLoading = false;
        state.registerError = action.error.message || 'Ошибка регистрации';
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loginIsLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginIsLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginIsLoading = false;
        state.loginError = action.error.message || 'Ошибка входа';
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.updateIsLoading = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.updateIsLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateIsLoading = false;
        state.updateError =
          action.error.message || 'Ошибка обновления данных пользователя';
      });
  }
});
export const { authChecked, logout } = userSlice.actions;
