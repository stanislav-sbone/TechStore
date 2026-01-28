import { Heart, Search, ShoppingCart, User, X } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <a href="#" className={styles.logo}>
            TechStore
          </a>
        </div>
        <div className={styles.searchHolder}>
          <span className={styles.searchIcon}>
            <Search color="#909cb2" size={23} />
          </span>
          <input
            className={styles.search}
            type="text"
            placeholder="Искать в TechStore"
          />
          <button className={styles.closeButton}>
            <X color="#909cb2" size={23} />
          </button>
        </div>
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
      </div>
    </header>
  );
};

export default Header;
