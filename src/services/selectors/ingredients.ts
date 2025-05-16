import { RootState } from '../store';

export const ingredientSelector = (state: RootState) => state.ingredients;
export const ingredientsSelector = (state: RootState) =>
  state.ingredients.ingredients;
export const isLoadingIngredientsSelector = (state: RootState) =>
  state.ingredients.isLoading;
export const errorIngredientsSelector = (state: RootState) =>
  state.ingredients.error;
export const ingredientByIdSelector = (id: string) => (state: RootState) =>
  state.ingredients.ingredients.find((item) => item._id === id);
