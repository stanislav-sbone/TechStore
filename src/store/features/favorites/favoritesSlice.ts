import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: number[];
  searchQuery: string;
}

const initialState: FavoritesState = {
  items: [],
  searchQuery: '',
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.items = action.payload;
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { setSearchQuery, setFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
