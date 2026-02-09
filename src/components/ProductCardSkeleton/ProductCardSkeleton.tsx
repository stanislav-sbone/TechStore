import type { FC } from 'react';
import ContentLoader from 'react-content-loader';
import styles from './ProductCardSkeleton.module.css';

const ProductCardSkeleton: FC = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.imageContainer}>
        <ContentLoader
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 300 225"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0 }}
        >
          <rect x="0" y="0" width="300" height="225" rx="12" ry="0" />
        </ContentLoader>
      </div>
      <div className={styles.content}>
        <ContentLoader
          speed={2}
          width="100%"
          height={120}
          viewBox="0 0 270 120"
        >
          <rect x="0" y="0" width="80" height="12" rx="4" />
          <rect x="0" y="24" width="270" height="16" rx="4" />
          <rect x="0" y="46" width="230" height="16" rx="4" />
          <rect x="0" y="88" width="90" height="28" rx="4" />
          <rect x="170" y="84" width="100" height="36" rx="8" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
