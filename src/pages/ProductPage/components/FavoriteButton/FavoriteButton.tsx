import { setFavorites } from '@/store/features/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { FC, MouseEvent } from 'react';
import styles from './FavoriteButton.module.css';
import { Heart } from 'lucide-react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { updateFavorites } from '@/services/user/userApi';
import { toast } from 'react-toastify';

interface FavoriteButtonProps {
  productID: number;
  isFavorite: boolean;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ productID, isFavorite }) => {
  const token = useAppSelector((state) => state.auth.token);
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();
  const { requireAuth } = useRequireAuth();

  const handleFavoriteClick = async (event: MouseEvent) => {
    try {
      event.stopPropagation();
      event.preventDefault();

      if (!requireAuth() || !token) return;

      const newFavorites = isFavorite
        ? favorites.filter((item) => item !== productID)
        : [...favorites, productID];

      const result = await updateFavorites(newFavorites, token);
      dispatch(setFavorites(result.items));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка избранных товаров';

      toast.error(message);
    }
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
