import { RootState } from '../store';

export const ingredientSelector = (state: RootState) => state.ingredient;
export const ingredientsSelector = (state: RootState) =>
  state.ingredient.ingredients;
export const isLoadingIngredientsSelector = (state: RootState) =>
  state.ingredient.isLoading;
export const errorIngredientsSelector = (state: RootState) =>
  state.ingredient.error;
export const ingredientByIdSelector = (id: string) => (state: RootState) =>
  state.ingredient.ingredients.find((item) => item._id === id);
