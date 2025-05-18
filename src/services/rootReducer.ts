import { combineReducers } from '@reduxjs/toolkit';
import {
  constructorSlice,
  feedSlice,
  ingredientsSlice,
  orderSlice,
  ordersSlice,
  userSlice
} from '@slices';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  ingredient: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  feed: feedSlice.reducer,
  orders: ordersSlice.reducer,
  order: orderSlice.reducer
});

export default rootReducer;
