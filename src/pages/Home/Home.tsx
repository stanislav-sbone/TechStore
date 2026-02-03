import type { FC } from 'react';
import styles from './Home.module.css';
import { products } from '../../data/products';

// TODO: Сделать фильтрацию товаров по категориям

const Home: FC = () => {
  return (
    <section className={styles.home}>
      <h1 className={styles.title}>Каталог товаров</h1>
      <div className={styles.productsGrid}>
        {products.map((p) => (
          <div className={styles.card} key={p.id}>
            <div className={styles.imageContainer}>
              <img src={p.images[0]} alt={p.title} className={styles.image} />
            </div>
            <div className={styles.content}>
              <h4 className={styles.category}>{p.category}</h4>
              <h3 className={styles.name}>{p.title}</h3>

              <div className={styles.footer}>
                <div className={styles.price}>
                  {p.price.toLocaleString('ru-RU')} ₽
                </div>
                <button className={styles.cartButton}>В корзину</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
