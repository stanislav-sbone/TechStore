import { Link, useLocation } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { HeaderNav, HeaderSearch } from './components';
import styles from './Header.module.css';
import { useEffect, useRef, useState } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const SCROLL_THRESHOLD = 100;

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > SCROLL_THRESHOLD
      ) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= 0) {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <header
      className={`${styles.header} ${!isHeaderVisible && isMobile ? styles.headerHidden : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          <Link to={ROUTES.HOME} className={styles.logo}>
            TechStore
          </Link>
        </div>
        {location.pathname === '/' && <HeaderSearch />}
        <HeaderNav />
      </div>
    </header>
  );
};

export default Header;
