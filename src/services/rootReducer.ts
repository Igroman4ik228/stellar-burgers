import { combineReducers } from '@reduxjs/toolkit';
import { constructorSlice, ingredientsSlice, userSlice } from '@slices';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  user: userSlice.reducer
});

export default rootReducer;
