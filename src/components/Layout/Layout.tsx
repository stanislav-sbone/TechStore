import { type FC, type ReactNode } from 'react';
import { Header } from '@/components/Header';
import { ScrollToTop } from '../ScrollToTop';
import { BottomMenu } from '../BottomMenu';
import { useLayout } from '@/hooks/useLayout';
import styles from './Layout.module.css';
import { Footer } from '../Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isMobile } = useLayout();

  return (
    <>
      <Header />
      <ScrollToTop />
      <main className={`${styles.main} ${isMobile ? styles.mainMobile : ''}`}>
        <div className={styles.container}>{children}</div>
      </main>
      {isMobile && <BottomMenu />}
      <Footer />
    </>
  );
};

export default Layout;
