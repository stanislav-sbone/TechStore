export interface OrderItem {
  productId: number;
  image: string;
  price: number;
  title: string;
  quantity: number;
}

export interface UserOrders {
  id: number;
  orderNumber: number;
  user_id: string;
  items: OrderItem[];
  totalAmount: number;
  created_at: string;
}
