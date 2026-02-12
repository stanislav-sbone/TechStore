import { useEffect, useMemo, useState, type FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/services/api';
import { setProducts } from '@/store/features/products/productsSlice';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { NoMatches } from '@/components/NoMatches';
import styles from './Home.module.css';

// TODO: Сделать фильтрацию товаров по категориям
// TODO: Создать состояние  и обработку ошибки при фетче

const Home: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const products = useAppSelector((state) => state.products.items);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);

      try {
        const data = await fetchProducts();
        dispatch(setProducts(data));
      } catch (error) {
        console.error(`Ошибка ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  if (filteredProducts.length === 0 && !isLoading) {
    return (
      <section className={styles.home}>
        <NoMatches />
      </section>
    );
  }

  return (
    <section className={styles.home}>
      <h1 className={styles.title}>Каталог товаров</h1>
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
