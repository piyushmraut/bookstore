import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});