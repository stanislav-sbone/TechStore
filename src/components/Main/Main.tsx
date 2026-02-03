import type { FC } from 'react';
import styles from './Main.module.css';
import Home from '../../pages/Home/Home';

const Main: FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Home />
      </div>
    </main>
  );
};

export default Main;
