import { useAppSelector } from '@/store/hooks';
import styles from './Favorites.module.css';
import { ProductCard } from '@/components/ProductCard';
import { useMemo } from 'react';
import EmptyFavorites from './EmptyFavorites';
import FavoritesFilter from './FavoritesFilter';
import { NoMatches } from '@/components/NoMatches';

const Favorites = () => {
  const products = useAppSelector((state) => state.products.items);
  const favorites = useAppSelector((state) => state.favorites.items);
  const searchQuery = useAppSelector((state) => state.favorites.searchQuery);

  const filteredFavoriteProducts = useMemo(() => {
    const favoriteProducts = products.filter((product) =>
      favorites.includes(product.id)
    );

    if (favoriteProducts.length === 0) return [];

    if (!searchQuery.trim()) return favoriteProducts;

    const query = searchQuery.toLowerCase();
    return favoriteProducts.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }, [favorites, products, searchQuery]);

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
      {filteredFavoriteProducts.length === 0 ? (
        <NoMatches />
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
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
