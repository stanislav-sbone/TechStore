import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductCategory } from '@/types/product';

interface ProductsState {
  items: Product[];
  searchQuery: string;
  category: ProductCategory | 'all';
}

const initialState: ProductsState = {
  items: [],
  searchQuery: '',
  category: 'all',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<ProductCategory | 'all'>) => {
      state.category = action.payload;
    },
  },
});

export const { setProducts, setSearchQuery, setCategory } =
  productsSlice.actions;
export default productsSlice.reducer;
