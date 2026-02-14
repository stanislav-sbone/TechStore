import { Heart, ShoppingCart, User } from 'lucide-react';
import styles from './Header.module.css';
import { Link } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { useAppSelector } from '@/store/hooks';

const HeaderButtons = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const cart = useAppSelector((state) => state.cart.items);

  const cartQuantity = cart.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <div className={styles.buttons}>
      <Link to={ROUTES.FAVORITES} className={styles.buttonLink}>
        <Heart color="#4a5568" size={27} />
        {favorites.length > 0 && (
          <span className={styles.badge}>
            {favorites.length > 99 ? '99' : favorites.length}
          </span>
        )}
      </Link>
      <Link to={ROUTES.CART} className={styles.buttonLink}>
        <ShoppingCart color="#4a5568" size={27} />
        {cartQuantity > 0 && (
          <span className={styles.badge}>
            {cartQuantity > 99 ? '99' : cartQuantity}
          </span>
        )}
      </Link>
      <Link to={ROUTES.PROFILE} className={styles.buttonLink}>
        <User color="#4a5568" size={27} />
      </Link>
    </div>
  );
};

export default HeaderButtons;
