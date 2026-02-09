import { Heart, ShoppingCart, User } from 'lucide-react';
import styles from './Header.module.css';
import { Link } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { useAppSelector } from '@/store/hooks';

const HeaderButtons = () => {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <div className={styles.buttons}>
      <Link to={ROUTES.FAVORITES}>
        <button className={styles.button}>
          <Heart color="#4a5568" size={27} />
          {favorites.length > 0 && (
            <span className={styles.badge}>
              {favorites.length > 99 ? '99' : favorites.length}
            </span>
          )}
        </button>
      </Link>
      <Link to={ROUTES.CART}>
        <button className={styles.button}>
          <ShoppingCart color="#4a5568" size={27} />
        </button>
      </Link>
      <Link to={ROUTES.PROFILE}>
        <button className={styles.button}>
          <User color="#4a5568" size={27} />
        </button>
      </Link>
    </div>
  );
};

export default HeaderButtons;
