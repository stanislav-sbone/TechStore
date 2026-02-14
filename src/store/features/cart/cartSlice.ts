import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const product = {
        productId: action.payload,
        quantity: 1,
      };
      state.items.push(product);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find((item) => item.productId === productId);

      if (product) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.productId !== productId
          );
        } else {
          product.quantity = quantity;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
