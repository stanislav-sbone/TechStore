import type { FC, MouseEvent } from 'react';
import styles from './ProductCard.module.css';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/features/favorites/favoritesSlice';
import { Link } from 'react-router';
import ProductPrice from './ProductPrice';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  discount: number | undefined;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  image,
  name,
  category,
  price,
  discount,
}) => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  const isFavorite = favorites.includes(id);

  const handleFavoriteClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(toggleFavorite(id));
  };

  return (
    <Link to={`/product/${id}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={image} alt={name} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h4 className={styles.category}>{category}</h4>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.footer}>
            <ProductPrice price={price} discount={discount} />
            <button className={styles.cartButton}>В корзину</button>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.favoriteButton}
            onClick={handleFavoriteClick}
          >
            <Heart
              size={24}
              fill={isFavorite ? '#ef4444' : 'none'}
              color={isFavorite ? '#ef4444' : 'currentColor'}
            />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
