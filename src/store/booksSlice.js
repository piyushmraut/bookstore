import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  popularBooks: [],
  loading: false,
  error: null,
  searchTerm: "",
  suggestions: [],
  activeCategory: "Mystery",
  categoryBooks: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setPopularBooks: (state, action) => {
      state.popularBooks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setCategoryBooks: (state, action) => {
      state.categoryBooks = action.payload;
    },
  },
});

export const {
  setBooks,
  setPopularBooks,
  setLoading,
  setError,
  setSearchTerm,
  setSuggestions,
  setActiveCategory,
  setCategoryBooks,
} = booksSlice.actions;

export default booksSlice.reducer;