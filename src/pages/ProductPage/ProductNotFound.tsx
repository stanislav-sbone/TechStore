import { HomeLink } from '@/components/HomeLink';
import styles from './ProductPage.module.css';

const ProductNotFound = () => {
  return (
    <div className={styles.notFound}>
      <img src="/nomatches.png" alt="notFound" className={styles.image} />
      <p className={styles.message}>Товар не найден</p>
      <HomeLink />
    </div>
  );
};

export default ProductNotFound;
