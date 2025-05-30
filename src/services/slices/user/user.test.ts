import { TUser } from '@utils-types';
import {
  getUser,
  initialState,
  loginUser,
  registerUser,
  updateUser,
  userSlice
} from './user';

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'test user'
};

describe('тест слайса user', () => {
  describe('регистрация пользователя', () => {
    test('состояние загрузки при регистрации', () => {
      const action = { type: registerUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.registerIsLoading).toBe(true);
      expect(state.registerError).toBe(null);
    });

    test('состояние успешной регистрации', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(
        { ...initialState, registerIsLoading: true },
        action
      );

      expect(state.data).toEqual(mockUser);
      expect(state.registerIsLoading).toBe(false);
      expect(state.registerError).toBe(null);
    });

    test('состояние ошибки при регистрации', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка регистрации' }
      };
      const state = userSlice.reducer(
        { ...initialState, registerIsLoading: true },
        action
      );

      expect(state.registerIsLoading).toBe(false);
      expect(state.registerError).toBe('Ошибка регистрации');
    });
  });

  describe('вход пользователя', () => {
    test('состояние загрузки при входе', () => {
      const action = { type: loginUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.loginIsLoading).toBe(true);
      expect(state.loginError).toBe(null);
    });

    test('состояние успешного входа', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(
        { ...initialState, loginIsLoading: true },
        action
      );

      expect(state.data).toEqual(mockUser);
      expect(state.loginIsLoading).toBe(false);
      expect(state.loginError).toBe(null);
    });

    test('состояние ошибки при входе с неверными данными', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Указан неверный адрес электронной почты или пароль' }
      };
      const state = userSlice.reducer(
        { ...initialState, loginIsLoading: true },
        action
      );

      expect(state.loginIsLoading).toBe(false);
      expect(state.loginError).toBe(
        'Указан неверный адрес электронной почты или пароль'
      );
    });
  });

  describe('получение данных пользователя', () => {
    test('состояние загрузки при запросе данных', () => {
      const action = { type: getUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.getIsLoading).toBe(true);
      expect(state.getError).toBe(null);
    });

    test('состояние успешного получения данных', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(
        { ...initialState, getIsLoading: true },
        action
      );

      expect(state.data).toEqual(mockUser);
      expect(state.getIsLoading).toBe(false);
      expect(state.getError).toBe(null);
    });

    test('состояние ошибки при получении данных', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Ошибка получения данных' }
      };
      const state = userSlice.reducer(
        { ...initialState, getIsLoading: true },
        action
      );

      expect(state.getIsLoading).toBe(false);
      expect(state.getError).toBe('Ошибка получения данных');
    });
  });

  describe('обновление данных пользователя', () => {
    test('состояние загрузки при обновлении данных', () => {
      const action = { type: updateUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.updateIsLoading).toBe(true);
      expect(state.updateError).toBe(null);
    });

    test('состояние успешного обновления данных', () => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const state = userSlice.reducer(
        { ...initialState, updateIsLoading: true },
        action
      );

      expect(state.data).toEqual(updatedUser);
      expect(state.updateIsLoading).toBe(false);
      expect(state.updateError).toBe(null);
    });

    test('состояние ошибки при обновлении данных', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'Ошибка обновления данных' }
      };
      const state = userSlice.reducer(
        { ...initialState, updateIsLoading: true },
        action
      );

      expect(state.updateIsLoading).toBe(false);
      expect(state.updateError).toBe('Ошибка обновления данных');
    });
  });

  test('состояние выхода пользователя', () => {
    const action = { type: userSlice.actions.logout.type };
    const state = userSlice.reducer(
      { ...initialState, data: mockUser },
      action
    );

    expect(state.data).toBe(null);
  });
});
