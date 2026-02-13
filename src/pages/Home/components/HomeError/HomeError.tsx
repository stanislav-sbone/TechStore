import type { FC } from 'react';
import styles from './HomeError.module.css';

interface HomeErrorProps {
  message: string;
}

const HomeError: FC<HomeErrorProps> = ({ message }) => {
  return (
    <div className={styles.error}>
      <img src="/nomatches.png" alt="notFound" className={styles.errorImage} />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default HomeError;
