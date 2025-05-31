import { TOrder } from '@utils-types';
import {
  getOrderByNumber,
  initialState,
  orderBurger,
  orderSlice
} from './order';

const mockOrder: TOrder = {
  _id: '1',
  number: 1,
  name: 'Бургер',
  status: 'done',
  ingredients: ['1', '2'],
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01'
};

describe('тест слайса order', () => {
  describe('создание заказа', () => {
    it('состояние загрузки при создании заказа', () => {
      const action = { type: orderBurger.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.newOrderIsLoading).toBe(true);
      expect(state.newOrderError).toBe(null);
    });

    it('состояние успешного создания заказа', () => {
      const action = {
        type: orderBurger.fulfilled.type,
        payload: mockOrder
      };
      const state = orderSlice.reducer(
        { ...initialState, newOrderIsLoading: true },
        action
      );

      expect(state.newOrderData).toEqual(mockOrder);
      expect(state.newOrderIsLoading).toBe(false);
      expect(state.newOrderError).toBe(null);
    });

    it('состояние ошибки при создании заказа', () => {
      const action = {
        type: orderBurger.rejected.type,
        error: { message: 'Ошибка создания' }
      };
      const state = orderSlice.reducer(
        { ...initialState, newOrderIsLoading: true },
        action
      );

      expect(state.newOrderIsLoading).toBe(false);
      expect(state.newOrderError).toBe('Ошибка создания');
    });
  });

  describe('получение заказа по номеру', () => {
    it('состояние загрузки при запросе заказа', () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.orderByNumberIsLoading).toBe(true);
      expect(state.orderByNumberError).toBe(null);
    });

    it('состояние успешного получения заказа', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const state = orderSlice.reducer(
        { ...initialState, orderByNumberIsLoading: true },
        action
      );

      expect(state.orderByNumber).toEqual(mockOrder);
      expect(state.orderByNumberIsLoading).toBe(false);
      expect(state.orderByNumberError).toBe(null);
    });

    it('состояние ошибки при получении заказа', () => {
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Заказ не найден' }
      };
      const state = orderSlice.reducer(
        { ...initialState, orderByNumberIsLoading: true },
        action
      );

      expect(state.orderByNumberIsLoading).toBe(false);
      expect(state.orderByNumberError).toBe('Заказ не найден');
    });
  });
});
