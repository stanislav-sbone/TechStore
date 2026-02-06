import type { FC } from 'react';
import styles from './Main.module.css';
import AppRoutes from '@/routes/AppRoutes';

const Main: FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <AppRoutes />
      </div>
    </main>
  );
};

export default Main;
