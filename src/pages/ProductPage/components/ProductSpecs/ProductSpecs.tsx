import type { FC } from 'react';
import styles from './ProductSpecs.module.css';

interface ProductSpecProps {
  specs: Record<string, string>;
}

const ProductSpecs: FC<ProductSpecProps> = ({ specs }) => {
  return (
    <div className={styles.specs}>
      <h3>Характеристики</h3>
      <dl className={styles.specsList}>
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className={styles.specRow}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ProductSpecs;
