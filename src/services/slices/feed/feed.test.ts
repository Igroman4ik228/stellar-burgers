import { TOrder } from '@utils-types';
import { feedSlice, getFeed, initialState } from './feed';

const mockFeedData = {
  orders: [
    {
      _id: '1',
      number: 1,
      name: 'Бургер',
      status: 'done',
      ingredients: ['1', '2'],
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01'
    }
  ] as TOrder[],
  total: 1,
  totalToday: 1
};

describe('тест слайса feed', () => {
  test('состояние загрузки при запросе ленты', () => {
    const action = { type: getFeed.pending.type };
    const state = feedSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('состояние успешной загрузки ленты', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: mockFeedData
    };
    const state = feedSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.orders).toEqual(mockFeedData.orders);
    expect(state.total).toBe(mockFeedData.total);
    expect(state.totalToday).toBe(mockFeedData.totalToday);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });

  test('состояние ошибки при загрузке ленты', () => {
    const action = {
      type: getFeed.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = feedSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
