import { combineReducers } from '@reduxjs/toolkit';
import {
  constructorSlice,
  feedSlice,
  ingredientsSlice,
  ordersSlice,
  userSlice
} from '@slices';

const rootReducer = combineReducers({
  ingredient: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  user: userSlice.reducer,
  feed: feedSlice.reducer,
  orders: ordersSlice.reducer
});

export default rootReducer;
