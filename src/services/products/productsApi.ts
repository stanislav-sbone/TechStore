import type { Product } from '@/types/product';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  // return response.data;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response.data);
    }, 5000);
  });
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await axios.get<Product>(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки данных с сервера', error);
    throw new Error('Ошибка загрузки данных');
  }
};
