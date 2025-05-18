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
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

type TUserState = {
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

const initialState: TUserState = {
  data: null,
  isAuthChecked: false,
  registerIsLoading: false,
  registerError: null,
  loginIsLoading: false,
  loginError: null,
  getIsLoading: false,
  getError: null,
  updateIsLoading: false,
  updateError: null
};

const handleAuthTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const { user, accessToken, refreshToken } = await registerUserApi(data);
    handleAuthTokens(accessToken, refreshToken);
    return user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData) => {
    const { user, accessToken, refreshToken } = await loginUserApi(loginData);
    handleAuthTokens(accessToken, refreshToken);
    return user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const { user } = await getUserApi();
  return user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (registerData: Partial<TRegisterData>) => {
    const { user } = await updateUserApi(registerData);
    return user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    dispatch(userSlice.actions.logout());
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) await dispatch(getUser());
    dispatch(userSlice.actions.authChecked());
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
      state.data = initialState.data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerIsLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerIsLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerIsLoading = false;
        state.registerError = action.error.message || 'Ошибка регистрации';
      })

      .addCase(loginUser.pending, (state) => {
        state.loginIsLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginIsLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginIsLoading = false;
        if (action.error.message === 'email or password are incorrect') {
          state.loginError =
            'Указан неверный адрес электронной почты или пароль';
          return;
        }
        state.loginError = action.error.message || 'Ошибка входа';
      })

      .addCase(getUser.pending, (state) => {
        state.getIsLoading = true;
        state.getError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getIsLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getIsLoading = false;
        state.getError = action.error.message || 'Ошибка получения данных';
      })

      .addCase(updateUser.pending, (state) => {
        state.updateIsLoading = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
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
