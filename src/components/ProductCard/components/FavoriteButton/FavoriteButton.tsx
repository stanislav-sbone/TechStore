import type { FC, MouseEvent } from 'react';
import { Heart } from 'lucide-react';
import styles from './FavoriteButton.module.css';

interface FavoriteButtonProps {
  isFavorite: boolean;
  handleFavoriteClick: (event: MouseEvent) => void;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  isFavorite,
  handleFavoriteClick,
}) => {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.favoriteButton} onClick={handleFavoriteClick}>
        <Heart
          size={24}
          fill={isFavorite ? '#ef4444' : 'none'}
          color={isFavorite ? '#ef4444' : 'currentColor'}
        />
      </button>
    </div>
  );
};

export default FavoriteButton;
