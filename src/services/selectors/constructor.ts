import { RootState } from '../store';

export const constructorSelector = (state: RootState) =>
  state.burgerConstructor;
export const constructorBunSelector = (state: RootState) =>
  state.burgerConstructor.bun;
export const constructorIngredientsSelector = (state: RootState) =>
  state.burgerConstructor.ingredients;
