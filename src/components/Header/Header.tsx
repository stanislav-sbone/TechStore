import { Search, X } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.logo}>TechStore</h1>
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
        <div className={styles.buttons}>buttons</div>
      </div>
    </header>
  );
};

export default Header;
