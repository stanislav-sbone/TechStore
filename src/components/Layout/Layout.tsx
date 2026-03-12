import { useEffect, type FC, type ReactNode } from 'react';
import styles from './Layout.module.css';
import { Header } from '@/components/Header';
import { ScrollToTop } from '../ScrollToTop';
import { BottomMenu } from '../BottomMenu';
import useIsMobile from '@/hooks/useIsMobile';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCurrentUser } from '@/services/users/usersApi';
import { logout, setUser } from '@/store/features/auth/authSlice';
import { AUTH_TOKEN_KEY } from '@/constants/auth';

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

        const result = await getCurrentUser(token);
        dispatch(setUser(result.user));
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
