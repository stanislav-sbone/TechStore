import { fetchProducts } from '@/services/api';
import { setProducts } from '@/store/features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useMemo, useState } from 'react';

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const products = useAppSelector((state) => state.products.items);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const category = useAppSelector((state) => state.products.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: Убрать условие проверки длины, когда будет написана API часть проекта
    // Добавил условие временно, чтобы не было каждый раз загрузки компонентов
    // с фейкового API с задержкой 3 секунды и загрузки скелетонов
    if (products.length === 0) {
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
    }
  }, [dispatch, products.length]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => product.title.toLowerCase().includes(query));
  }, [products, searchQuery, category]);

  return { products: filteredProducts, isLoading, error, searchQuery };
};
