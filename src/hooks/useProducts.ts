import { fetchProducts } from '@/services/products/productsApi';
import { setProducts } from '@/store/features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useMemo, useState } from 'react';

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    items: products,
    searchQuery,
    category,
  } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const data = await fetchProducts();
        dispatch(setProducts(data));
      } catch (error) {
        console.error(`Ошибка ${error}`);
        setError('Произошла ошибка при загрузке данных. Попробуйте позже');
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [dispatch, products.length]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => product.title.toLowerCase().includes(query));
  }, [products, searchQuery, category]);

  return { products: filteredProducts, isLoading, error, searchQuery };
};
