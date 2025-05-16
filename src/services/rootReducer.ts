import { combineReducers } from '@reduxjs/toolkit';
import { constructorSlice, ingredientsSlice, userSlice } from '@slices';
import { feedSlice } from './slices/feed';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  user: userSlice.reducer,
  feed: feedSlice.reducer
});

export default rootReducer;
