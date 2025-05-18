import { RootState } from '../store';

export const ingredientsSelector = (state: RootState) => state.ingredient;
export const ingredientsDataSelector = (state: RootState) =>
  state.ingredient.data;
export const ingredientDataByIdSelector = (id: string) => (state: RootState) =>
  state.ingredient.data.find((item) => item._id === id);
export const ingredientsIsLoadingSelector = (state: RootState) =>
  state.ingredient.isLoading;
export const ingredientsErrorSelector = (state: RootState) =>
  state.ingredient.error;
