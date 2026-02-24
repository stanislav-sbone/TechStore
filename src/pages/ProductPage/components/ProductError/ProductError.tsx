import type { FC } from 'react';
import { HomeLink } from '@/components/HomeLink';
import styles from './ProductError.module.css';

interface ProductErrorProps {
  message: string;
}

const ProductError: FC<ProductErrorProps> = ({ message }) => {
  return (
    <div className={styles.error}>
      <img
        src="/common/nomatches.png"
        alt="notFound"
        className={styles.errorImage}
      />
      <p className={styles.message}>{message}</p>
      <HomeLink />
    </div>
  );
};

export default ProductError;
