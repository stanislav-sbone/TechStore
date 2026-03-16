import { getProducts } from '@/store/features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useMemo } from 'react';

export const useProducts = () => {
  const {
    items: products,
    searchQuery,
    category,
    error,
    loading,
  } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(getProducts());
    }
  }, [dispatch, loading]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => product.title.toLowerCase().includes(query));
  }, [products, searchQuery, category]);

  return { products: filteredProducts, loading, error, searchQuery };
};
