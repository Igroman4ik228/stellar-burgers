import { TIngredient } from '@utils-types';
import {
  addIngredient,
  constructorSlice,
  initialState,
  moveIngredient,
  removeIngredient
} from './constructor';

const mockBun: TIngredient = {
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
};

const mockIngredient: TIngredient = {
  _id: '2',
  name: 'Котлета',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 150,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('тест слайса constructor', () => {
  test('добавление булки в конструктор', () => {
    const action = addIngredient(mockBun);
    const state = constructorSlice.reducer(initialState, action);

    expect(state.bun).toEqual(
      expect.objectContaining({
        name: 'Булка',
        type: 'bun'
      })
    );
  });

  test('добавление ингредиента в конструктор', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorSlice.reducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe('Котлета');
  });

  test('удаление ингредиента из конструктора', () => {
    const id = '123';
    const ingredient = { ...mockIngredient, id: id };
    const action = removeIngredient(id);
    const state = constructorSlice.reducer(
      {
        bun: null,
        ingredients: [ingredient]
      },
      action
    );

    expect(state.ingredients).toHaveLength(0);
  });

  test('перемещение ингредиента в конструкторе', () => {
    const ingredient1 = { ...mockIngredient, id: '123', name: 'Первый' };
    const ingredient2 = { ...mockIngredient, id: '456', name: 'Второй' };
    const initialState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const action = moveIngredient({ from: 0, to: 1 });
    const state = constructorSlice.reducer(initialState, action);

    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Первый');
  });
});
