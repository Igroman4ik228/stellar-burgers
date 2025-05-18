import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state,
        action: PayloadAction<{
          ingredient: TConstructorIngredient;
        }>
      ) => {
        const { ingredient } = action.payload;
        if (ingredient.type === 'bun') state.bun = ingredient;
        else state.ingredients.push(ingredient);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ingredient: { ...ingredient, id: uuidv4() }
        }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const ingredients = [...state.ingredients];
      ingredients.splice(
        action.payload.to,
        0,
        ingredients.splice(action.payload.from, 1)[0]
      );
      state.ingredients = ingredients;
    },
    clearConstructor: () => initialState
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;
