import { Heart, ShoppingCart, User } from 'lucide-react';
import styles from './Header.module.css';
import { Link } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';

const HeaderButtons = () => {
  return (
    <div className={styles.buttons}>
      <Link to={ROUTES.FAVORITES}>
        <button className={styles.button}>
          <Heart color="#4a5568" size={27} />
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
