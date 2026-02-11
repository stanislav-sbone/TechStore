import type { FC } from 'react';
import styles from './ProductBadges.module.css';

interface ProductBadgesProps {
  isNew: boolean;
  discount: number | undefined;
}

const ProductBadges: FC<ProductBadgesProps> = ({ isNew, discount }) => {
  return (
    <div className={styles.badges}>
      {isNew && <span className={styles.badgeNew}>Новинка</span>}
      {discount != null && (
        <span className={styles.badgeDiscount}>
          −{Math.round(discount * 100)}%
        </span>
      )}
    </div>
  );
};

export default ProductBadges;
