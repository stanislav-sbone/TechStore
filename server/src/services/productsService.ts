import { products } from '../data/products';
import type { Product } from '../types/product';

export const findProductById = (productId: number): Product | null => {
  const product = products.find((productItem) => productItem.id === productId);

  if (!product) {
    return null;
  }

  return product;
};
