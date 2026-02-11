import { toggleFavorite } from '@/store/features/favorites/favoritesSlice';
import { useAppDispatch } from '@/store/hooks';
import type { FC, MouseEvent } from 'react';
import styles from './FavoriteButton.module.css';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  productID: number;
  isFavorite: boolean;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ productID, isFavorite }) => {
  const dispatch = useAppDispatch();

  const handleFavoriteClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(toggleFavorite(productID));
  };

  return (
    <button onClick={handleFavoriteClick} className={styles.favoriteButton}>
      <Heart
        size={27}
        fill={isFavorite ? '#ef4444' : 'none'}
        color={isFavorite ? '#ef4444' : 'currentColor'}
      />
    </button>
  );
};

export default FavoriteButton;
