import { useEffect, useMemo, useState } from 'react';
import type { ProductCategory } from '@/types/product';
import { useAppSelector } from '@/store/hooks';
import { ProductCard } from '@/components/ProductCard';
import { NoMatches } from '@/components/NoMatches';
import { CategoryFilter, EmptyFavorites, FavoritesFilter } from './components';
import styles from './Favorites.module.css';

const Favorites = () => {
  const products = useAppSelector((state) => state.products.items);
  const favorites = useAppSelector((state) => state.favorites.items);
  const searchQuery = useAppSelector((state) => state.favorites.searchQuery);

  const [category, setCategory] = useState<'Все' | ProductCategory>('Все');

  const filteredFavoriteProducts = useMemo(() => {
    const favoriteProducts = products.filter((product) =>
      favorites.includes(product.id)
    );

    if (favoriteProducts.length === 0) return [];

    const query = searchQuery.toLowerCase();

    return favoriteProducts
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

  if (favorites.length === 0) {
    return (
      <section className={styles.favorites}>
        <EmptyFavorites />
      </section>
    );
  }

  return (
    <section className={styles.favorites}>
      <h1 className={styles.title}>Избранные товары</h1>
      <FavoritesFilter />
      <CategoryFilter
        currentCategory={category}
        categories={categories}
        setCategory={setCategory}
      />
      {filteredFavoriteProducts.length === 0 ? (
        <NoMatches value={searchQuery} />
      ) : (
        <div className={styles.productsGrid}>
          {filteredFavoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.images[0]}
              name={product.title}
              category={product.category}
              price={product.price}
              discount={product.discount}
              inStock={product.inStock}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
