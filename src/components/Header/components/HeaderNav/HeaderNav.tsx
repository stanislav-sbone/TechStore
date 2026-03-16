import { Link, useLocation } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { useAppSelector } from '@/store/hooks';
import { navItems } from '@/constants/navigation';
import styles from './HeaderNav.module.css';

const HeaderNav = () => {
  const { pathname } = useLocation();
  const favorites = useAppSelector((state) => state.favorites.items);
  const cart = useAppSelector((state) => state.cart.items);

  const cartQuantity = cart.reduce((acc, cur) => acc + cur.quantity, 0);

  const getBadgeQuantity = (path: string) => {
    if (path === ROUTES.FAVORITES) return favorites.length;
    if (path === ROUTES.CART) return cartQuantity;
  };

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => {
        if (item.label === 'Главная') return;
        const isActive = item.path === pathname;
        const badgeCount = getBadgeQuantity(item.path) || 0;

        return (
          <Link to={item.path} key={item.path} className={styles.buttonLink}>
            <item.icon color={isActive ? '#3182ce' : '#4a5568'} size={27} />
            {item.hasBadge && badgeCount > 0 && (
              <span className={styles.badge}>{badgeCount}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default HeaderNav;
