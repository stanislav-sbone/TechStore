import { useEffect, type FC, type ReactNode } from 'react';
import { Header } from '@/components/Header';
import { ScrollToTop } from '../ScrollToTop';
import { BottomMenu } from '../BottomMenu';
import useIsMobile from '@/hooks/useIsMobile';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, setUser } from '@/store/features/auth/authSlice';
import { AUTH_TOKEN_KEY } from '@/constants/auth';
import { getCart, getCurrentUser, getFavorites } from '@/services/user/userApi';
import styles from './Layout.module.css';
import { setFavorites } from '@/store/features/favorites/favoritesSlice';
import { setCart } from '@/store/features/cart/cartSlice';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        if (!token || user) return;

        const userData = await getCurrentUser(token);
        const favorites = await getFavorites(token);
        const cart = await getCart(token);
        dispatch(setUser(userData.user));
        dispatch(setFavorites(favorites.items));
        dispatch(setCart(cart.items));
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        dispatch(logout());
      }
    };

    loadCurrentUser();
  }, [token, user, dispatch]);

  return (
    <>
      <Header />
      <ScrollToTop />
      <main className={`${styles.main} ${isMobile ? styles.mainMobile : ''}`}>
        <div className={styles.container}>{children}</div>
      </main>
      {isMobile && <BottomMenu />}
    </>
  );
};

export default Layout;
