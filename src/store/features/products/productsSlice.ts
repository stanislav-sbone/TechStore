import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Product, ProductCategory } from '@/types/product';
import { fetchProducts } from '@/services/products/productsApi';
import axios from 'axios';

interface ProductsState {
  items: Product[];
  searchQuery: string;
  category: ProductCategory | 'all';
  error: string | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export const getProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/getProducts', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchProducts();

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return rejectWithValue('Ошибка загрузки данных');
    }

    if (error instanceof Error) {
      console.error(error.message);
      return rejectWithValue('Ошибка загрузки данных');
    }

    return rejectWithValue('Ошибка загрузки данных');
  }
});

const initialState: ProductsState = {
  items: [],
  searchQuery: '',
  category: 'all',
  error: null,
  loading: 'idle',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<ProductCategory | 'all'>) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error =
          action.payload ?? action.error.message ?? 'Ошибка загрузки данных';
      });
  },
});

export const { setSearchQuery, setCategory } = productsSlice.actions;
export default productsSlice.reducer;
