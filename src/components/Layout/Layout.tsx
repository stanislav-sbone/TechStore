import type { FC, ReactNode } from 'react';
import styles from './Layout.module.css';
import { Header } from '@/components/Header';
import { ScrollToTop } from '../ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
    </>
  );
};

export default Layout;
