import { Link, useLocation } from 'react-router';
import styles from './BottomMenu.module.css';
import { Home, Heart, ShoppingCart, User } from 'lucide-react';

const BottomMenu = () => {
  const { pathname } = useLocation();

  return (
    <nav className={styles.bottomMenu}>
      <Link
        to="/"
        className={
          pathname === '/' ? `${styles.activeLink} ${styles.link}` : styles.link
        }
      >
        <Home color={pathname === '/' ? '#3182ce' : '#4a5568'} size={24} />
        <span className={styles.label}>Главная</span>
      </Link>
      <Link
        to="/favorites"
        className={
          pathname === '/favorites'
            ? `${styles.activeLink} ${styles.link}`
            : styles.link
        }
      >
        <Heart
          color={pathname === '/favorites' ? '#3182ce' : '#4a5568'}
          size={24}
        />
        <span className={styles.label}>Избранное</span>
      </Link>
      <Link
        to="/cart"
        className={
          pathname === '/cart'
            ? `${styles.activeLink} ${styles.link}`
            : styles.link
        }
      >
        <ShoppingCart
          color={pathname === '/cart' ? '#3182ce' : '#4a5568'}
          size={24}
        />
        <span className={styles.label}>Корзина</span>
      </Link>
      <Link
        to="/profile"
        className={
          pathname === '/profile'
            ? `${styles.activeLink} ${styles.link}`
            : styles.link
        }
      >
        <User
          color={pathname === '/profile' ? '#3182ce' : '#4a5568'}
          size={24}
        />
        <span className={styles.label}>Профиль</span>
      </Link>
    </nav>
  );
};

export default BottomMenu;
