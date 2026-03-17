import type { FC } from 'react';
import styles from './ErrorMesage.module.css';

interface ErrorMesageProps {
  message: string;
}

const ErrorMesage: FC<ErrorMesageProps> = ({ message }) => {
  return (
    <div className={styles.error}>
      <img
        src="/common/nomatches.png"
        alt="notFound"
        className={styles.errorImage}
      />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default ErrorMesage;
