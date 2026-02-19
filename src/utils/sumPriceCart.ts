import type { Product } from '@/types/product';

interface Cart extends Product {
  quantity: number;
}

export const sumPriceCart = (cart: Cart[]): number => {
  const total = cart.reduce((acc, product) => {
    const price = product.discount
      ? product.price * (1 - product.discount)
      : product.price;

    return acc + price * product.quantity;
  }, 0);

  return Math.round(total);
};
