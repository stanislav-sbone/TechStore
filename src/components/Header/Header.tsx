import { Link, useLocation } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { HeaderButtons, HeaderSearch } from './components';
import styles from './Header.module.css';

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
        {location.pathname === '/' && <HeaderSearch />}
        <HeaderButtons />
      </div>
    </header>
  );
};

export default Header;
