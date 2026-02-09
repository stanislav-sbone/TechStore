import { useAppSelector } from '@/store/hooks';
import styles from './Favorites.module.css';
import { ProductCard } from '@/components/ProductCard';
import { useMemo } from 'react';
import EmptyFavorites from './EmptyFavorites';

const Favorites = () => {
  const products = useAppSelector((state) => state.products.items);
  const favorites = useAppSelector((state) => state.favorites.items);

  const favoriteProducts = useMemo(() => {
    return products.filter((product) => favorites.includes(product.id));
  }, [favorites, products]);

  if (favoriteProducts.length === 0) {
    return (
      <section className={styles.favorites}>
        <EmptyFavorites />
      </section>
    );
  }

  return (
    <section className={styles.favorites}>
      <h1 className={styles.title}>
        Избранные товары ({favoriteProducts.length})
      </h1>
      <div className={styles.productsGrid}>
        {favoriteProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.images[0]}
            name={product.title}
            category={product.category}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default Favorites;
