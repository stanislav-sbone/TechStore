import { Link } from 'react-router';
import styles from './BottomMenu.module.css';
import { Home, Heart, ShoppingCart, User } from 'lucide-react';

const BottomMenu = () => {
  return (
    <nav className={styles.bottomMenu}>
      <Link to="/" className={styles.link}>
        <Home color="#4a5568" size={24} />
        <span className={styles.label}>Главная</span>
      </Link>
      <Link to="/favorites" className={styles.link}>
        <Heart color="#4a5568" size={24} />
        <span className={styles.label}>Избранное</span>
      </Link>
      <Link to="/cart" className={styles.link}>
        <ShoppingCart color="#4a5568" size={24} />
        <span className={styles.label}>Корзина</span>
      </Link>
      <Link to="/profile" className={styles.link}>
        <User color="#4a5568" size={24} />
        <span className={styles.label}>Профиль</span>
      </Link>
    </nav>
  );
};

export default BottomMenu;
