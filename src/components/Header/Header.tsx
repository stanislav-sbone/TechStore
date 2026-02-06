import { Link } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import HeaderButtons from './HeaderButtons';
import HeaderSearch from './HeaderSearch';
import styles from './Header.module.css';

// TODO: сделать бургер меню

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          <Link to={ROUTES.HOME} className={styles.logo}>
            TechStore
          </Link>
        </div>

        <button className={styles.menuToggle}>
          <span className={styles.burger}></span>
          <span className={styles.burger}></span>
          <span className={styles.burger}></span>
        </button>

        <HeaderSearch />
        <HeaderButtons />
      </div>
    </header>
  );
};

export default Header;
