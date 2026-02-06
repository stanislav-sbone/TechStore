import { Heart, ShoppingCart, User } from 'lucide-react';
import styles from './Header.module.css';

const HeaderButtons = () => {
  return (
    <div className={styles.buttons}>
      <button className={styles.button}>
        <Heart color="#4a5568" size={27} />
      </button>
      <button className={styles.button}>
        <ShoppingCart color="#4a5568" size={27} />
      </button>
      <button className={styles.button}>
        <User color="#4a5568" size={27} />
      </button>
    </div>
  );
};

export default HeaderButtons;
