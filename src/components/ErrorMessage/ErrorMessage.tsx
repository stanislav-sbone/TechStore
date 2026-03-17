import type { FC } from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMesageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMesageProps> = ({ message }) => {
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

export default ErrorMessage;
