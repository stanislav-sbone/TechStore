import type { FC, MouseEvent } from 'react';
import styles from './ProductCard.module.css';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/features/favorites/favoritesSlice';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  image,
  name,
  category,
  price,
}) => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  const isFavorite = favorites.includes(id);

  const onClick = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavorite(id));
  };

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
      <div className={styles.buttonWrapper}>
        <button className={styles.favoriteButton} onClick={onClick}>
          <Heart
            size={24}
            fill={isFavorite ? '#ef4444' : 'none'}
            color={isFavorite ? '#ef4444' : 'currentColor'}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
