import type { FC } from 'react';
import styles from './Home.module.css';
import { products } from '../../data/products';
import ProductCard from './ProductCard';

// TODO: Сделать фильтрацию товаров по категориям

const Home: FC = () => {
  return (
    <section className={styles.home}>
      <h1 className={styles.title}>Каталог товаров</h1>
      <div className={styles.productsGrid}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            image={p.images[0]}
            name={p.title}
            category={p.category}
            price={p.price}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
