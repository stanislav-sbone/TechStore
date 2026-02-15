import type { FC, ReactNode } from 'react';
import styles from './Layout.module.css';
import { Header } from '@/components/Header';
import { ScrollToTop } from '../ScrollToTop';
import { BottomMenu } from '../BottomMenu';
import useIsMobile from '@/hooks/useIsMobile';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile(600);
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
