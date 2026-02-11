import type { FC } from 'react';
import { HomeLink } from '@/components/HomeLink';
import styles from './ProductPage.module.css';

interface ProductErrorProps {
  message: string;
}

const ProductError: FC<ProductErrorProps> = ({ message }) => {
  return (
    <div className={styles.notFound}>
      <img
        src="/nomatches.png"
        alt="notFound"
        className={styles.notFoundImage}
      />
      <p className={styles.message}>{message}</p>
      <HomeLink />
    </div>
  );
};

export default ProductError;
