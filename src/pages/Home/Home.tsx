import type { FC } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { NoMatches } from '@/components/NoMatches';
import { HomeHeader } from './components';
import HomeError from './components/HomeError/HomeError';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useProducts } from '@/hooks/useProducts';
import styles from './Home.module.css';

const Home: FC = () => {
  useDocumentTitle('Каталог товаров');
  const { products, isLoading, error, searchQuery } = useProducts();

  if (error) {
    return (
      <section className={styles.home}>
        <HomeError message={error} />
      </section>
    );
  }

  if (products.length === 0 && !isLoading) {
    return (
      <section className={styles.home}>
        <HomeHeader />
        <NoMatches value={searchQuery} />
      </section>
    );
  }

  return (
    <section className={styles.home}>
      <HomeHeader />

      {isLoading ? (
        <div className={styles.productsGrid}>
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className={styles.productsGrid}>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              image={p.images[0]}
              name={p.title}
              category={p.category}
              price={p.price}
              discount={p.discount}
              inStock={p.inStock}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
