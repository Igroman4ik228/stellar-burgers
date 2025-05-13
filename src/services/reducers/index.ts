import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/auth';
import ingredientsReducer from '../slices/ingredients';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer
});

export default rootReducer;
