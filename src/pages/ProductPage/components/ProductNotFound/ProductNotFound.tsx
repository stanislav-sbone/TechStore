import { HomeLink } from '@/components/HomeLink';
import styles from './ProductNotFound.module.css';

const ProductNotFound = () => {
  return (
    <div className={styles.notFound}>
      <img
        src="/common/nomatches.png"
        alt="notFound"
        className={styles.notFoundImage}
      />
      <p className={styles.message}>Товар не найден</p>
      <HomeLink />
    </div>
  );
};

export default ProductNotFound;
