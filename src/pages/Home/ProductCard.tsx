import type { FC } from 'react';
import styles from './Home.module.css';

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  price: number;
}

const ProductCard: FC<ProductCardProps> = ({
  image,
  name,
  category,
  price,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h4 className={styles.category}>{category}</h4>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.footer}>
          <div className={styles.price}>{price.toLocaleString('ru-RU')} ₽</div>
          <button className={styles.cartButton}>В корзину</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
