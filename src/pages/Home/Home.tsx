import { useEffect, useMemo, useState, type FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/services/api';
import { setProducts } from '@/store/features/products/productsSlice';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { NoMatches } from '@/components/NoMatches';
import { HomeHeader } from './components';
import HomeError from './components/HomeError/HomeError';
import styles from './Home.module.css';

const Home: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const products = useAppSelector((state) => state.products.items);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const category = useAppSelector((state) => state.products.category);
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
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => product.title.toLowerCase().includes(query));
  }, [products, searchQuery, category]);

  if (error) {
    return (
      <section className={styles.home}>
        <HomeError message={error} />
      </section>
    );
  }

  if (filteredProducts.length === 0 && !isLoading) {
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
          {filteredProducts.map((p) => (
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
