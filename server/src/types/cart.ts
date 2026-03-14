export interface CartItem {
  productId: number;
  quantity: number;
}

export interface UserCart {
  userId: string;
  items: CartItem[];
}
