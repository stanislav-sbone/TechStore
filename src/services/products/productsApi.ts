import type { Product } from '@/types/product';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки данных с сервера', error);
    throw new Error();
  }
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки данных с сервера', error);
    throw new Error();
  }
};
