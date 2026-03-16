import { Link, useLocation } from 'react-router';
import { navItems } from '@/constants/navigation';
import styles from './BottomMenu.module.css';
import { useAppSelector } from '@/store/hooks';
import { ROUTES } from '@/routes/constants/routes';

const BottomMenu = () => {
  const { pathname } = useLocation();
  const favorites = useAppSelector((state) => state.favorites.items);
  const cart = useAppSelector((state) => state.cart.items);

  const cartQuantity = cart.reduce((acc, cur) => acc + cur.quantity, 0);

  const getBadgeQuantity = (path: string) => {
    if (path === ROUTES.FAVORITES) return favorites.length;
    if (path === ROUTES.CART) return cartQuantity;

    return 0;
  };

  return (
    <nav className={styles.bottomMenu}>
      {navItems.map((item) => {
        const isActive = item.path === pathname;
        const badgeCount = getBadgeQuantity(item.path);

        return (
          <Link
            to={item.path}
            key={item.path}
            className={
              isActive ? `${styles.activeLink} ${styles.link}` : styles.link
            }
          >
            <div className={styles.iconWrapper}>
              <item.icon color={isActive ? '#3182ce' : '#4a5568'} size={24} />
              {item.hasBadge && badgeCount > 0 && (
                <span className={styles.badge}>{badgeCount}</span>
              )}
            </div>
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomMenu;
