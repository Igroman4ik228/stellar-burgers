import { RootState } from '../store';

export const constructorSelector = (state: RootState) =>
  state.burgerConstructor;
export const constructorIngredientsSelector = (state: RootState) => ({
  bun: state.burgerConstructor.bun,
  ingredients: state.burgerConstructor.ingredients
});
