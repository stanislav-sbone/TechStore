import { Link, useLocation } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { HeaderButtons, HeaderSearch } from './components';
import styles from './Header.module.css';

// TODO: сделать бургер меню либо нижнее меню

const Header = () => {
  const location = useLocation();

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

        {location.pathname === '/' && <HeaderSearch />}
        <HeaderButtons />
      </div>
    </header>
  );
};

export default Header;
