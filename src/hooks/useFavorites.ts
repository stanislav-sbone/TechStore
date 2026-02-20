import { useAppSelector } from '@/store/hooks';
import type { ProductCategory } from '@/types/product';
import { useEffect, useMemo, useState } from 'react';

export const useFavorites = () => {
  const { items: favorites, searchQuery } = useAppSelector(
    (state) => state.favorites
  );
  const products = useAppSelector((state) => state.products.items);
  const [category, setCategory] = useState<'Все' | ProductCategory>('Все');

  const filteredFavoriteProducts = useMemo(() => {
    const favoriteProducts = favorites.map((fav) => {
      const product = products.find((product) => product.id === fav);
      if (!product) return null;

      return product;
    });

    if (favoriteProducts.length === 0) return [];

    const query = searchQuery.toLowerCase();

    return favoriteProducts
      .filter((product) => product !== null)
      .filter((product) => category === 'Все' || product.category === category)
      .filter((product) => product.title.toLowerCase().includes(query));
  }, [favorites, products, searchQuery, category]);

  const categories = useMemo<Array<'Все' | ProductCategory>>(() => {
    const favoriteProducts = products.filter((product) =>
      favorites.includes(product.id)
    );

    const availableCategories = favoriteProducts.map((p) => p.category);

    return ['Все', ...new Set(availableCategories)];
  }, [favorites, products]);

  useEffect(() => {
    if (!categories.includes(category) && category !== 'Все') {
      const timeoutId = setTimeout(() => {
        setCategory('Все');
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [categories, category]);

  return {
    favoritesCount: favorites.length,
    filteredFavorites: filteredFavoriteProducts,
    categories,
    category,
    searchQuery,
    setCategory,
  };
};
