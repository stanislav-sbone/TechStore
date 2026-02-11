import { products } from '@/data/products';
import type { Product } from '@/types/product';

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1500);
  });
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  const product = products.find((product) => product.id === id);

  return new Promise((resolve) => {
    setTimeout(() => {
      if (product) {
        resolve(product);
      } else {
        resolve(null);
      }
    }, 1000);
  });
};
