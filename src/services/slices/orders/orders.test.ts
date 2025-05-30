import { TOrder } from '@utils-types';
import { getOrders, initialState, ordersSlice } from './orders';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    number: 1,
    name: 'Бургер',
    status: 'done',
    ingredients: ['1', '2'],
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  }
];

describe('тест слайса orders', () => {
  test('состояние загрузки при запросе заказов', () => {
    const action = { type: getOrders.pending.type };
    const state = ordersSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('состояние успешной загрузки заказов', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = ordersSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.data).toEqual(mockOrders);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });

  test('состояние ошибки при загрузке заказов', () => {
    const action = {
      type: getOrders.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = ordersSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
