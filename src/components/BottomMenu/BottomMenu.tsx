import { Link, useLocation } from 'react-router';
import { navItems } from '@/constants/bottomNav';
import styles from './BottomMenu.module.css';

const BottomMenu = () => {
  const { pathname } = useLocation();

  return (
    <nav className={styles.bottomMenu}>
      {navItems.map((item) => {
        const isActive = item.path === pathname;

        return (
          <Link
            to={item.path}
            key={item.path}
            className={
              isActive ? `${styles.activeLink} ${styles.link}` : styles.link
            }
          >
            <item.icon color={isActive ? '#3182ce' : '#4a5568'} size={24} />
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomMenu;
