import { toggleFavorite } from '@/store/features/favorites/favoritesSlice';
import { useAppDispatch } from '@/store/hooks';
import type { FC, MouseEvent } from 'react';
import styles from './FavoriteButton.module.css';
import { Heart } from 'lucide-react';
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface FavoriteButtonProps {
  productID: number;
  isFavorite: boolean;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ productID, isFavorite }) => {
  const dispatch = useAppDispatch();
  const { requireAuth } = useRequireAuth();

  const handleFavoriteClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!requireAuth()) return;

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
