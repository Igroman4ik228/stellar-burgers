import { TIngredient } from '@utils-types';
import { getIngredients, ingredientsSlice, initialState } from './ingredients';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('тест слайса ingredients', () => {
  it('состояние загрузки при запросе ингредиентов', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('состояние успешной загрузки ингредиентов', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.data).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('состояние ошибки при загрузке ингредиентов', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = ingredientsSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
