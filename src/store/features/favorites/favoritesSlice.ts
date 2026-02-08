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
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (!state.items.includes(id)) {
        state.items.push(id);
      } else {
        state.items = state.items.filter((item) => item !== id);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleFavorite, setSearchQuery } = favoritesSlice.actions;
export default favoritesSlice.reducer;
