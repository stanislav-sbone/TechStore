import { Heart, Search, ShoppingCart, User, X } from 'lucide-react';
import styles from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSearchQuery } from '../../store/features/productsSlice';

const Header = () => {
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          <a href="#" className={styles.logo}>
            TechStore
          </a>
        </div>

        <button className={styles.menuToggle}>
          <span className={styles.burger}></span>
          <span className={styles.burger}></span>
          <span className={styles.burger}></span>
        </button>

        <div className={styles.searchHolder}>
          <span className={styles.searchIcon}>
            <Search color="#909cb2" size={23} />
          </span>
          <input
            className={styles.search}
            type="text"
            placeholder="Искать в TechStore"
            value={searchQuery}
            onChange={(event) => dispatch(setSearchQuery(event.target.value))}
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
