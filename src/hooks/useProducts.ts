import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';

export const useProducts = () => {
  const {
    items: products,
    searchQuery,
    category,
    error,
    loading,
  } = useAppSelector((state) => state.products);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => product.title.toLowerCase().includes(query));
  }, [products, searchQuery, category]);

  return { products: filteredProducts, loading, error, searchQuery };
};
