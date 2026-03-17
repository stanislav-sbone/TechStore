import type { FC } from 'react';
import ContentLoader from 'react-content-loader';
import styles from './CartProductCardSkeleton.module.css';

const CartProductCardSkeleton: FC = () => {
  return (
    <article className={styles.card}>
      <div className={styles.desktop}>
        <ContentLoader
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 1000 160"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Изображение */}
          <rect x="16" y="16" width="120" height="120" rx="10" ry="10" />

          {/* Хедер */}
          <rect x="180" y="22" width="520" height="16" rx="6" ry="6" />
          <circle cx="980" cy="30" r="12" />

          {/* Блоки */}
          <rect x="180" y="88" width="80" height="12" rx="6" ry="6" />
          <rect x="180" y="116" width="110" height="18" rx="6" ry="6" />

          <rect x="460" y="88" width="100" height="12" rx="6" ry="6" />
          <rect x="460" y="116" width="140" height="18" rx="6" ry="6" />

          <rect x="730" y="88" width="110" height="12" rx="6" ry="6" />
          <rect x="730" y="116" width="170" height="18" rx="6" ry="6" />
        </ContentLoader>
      </div>

      <div className={styles.mobile}>
        <ContentLoader
          speed={2}
          width="100%"
          height={420}
          viewBox="0 0 360 400"
          preserveAspectRatio="none"
          style={{ width: '100%', height: 420 }}
        >
          {/* Изображение*/}
          <rect x="0" y="0" width="360" height="270" rx="12" ry="12" />

          {/* Хедер */}
          <rect x="0" y="286" width="260" height="16" rx="6" ry="6" />
          <circle cx="344" cy="294" r="12" />
          <rect x="0" y="316" width="360" height="2" rx="1" ry="1" />

          {/* Блоки */}
          <rect x="0" y="334" width="60" height="10" rx="5" ry="5" />
          <rect x="0" y="350" width="70" height="14" rx="6" ry="6" />

          <rect x="130" y="334" width="90" height="10" rx="5" ry="5" />
          <rect x="130" y="350" width="85" height="14" rx="6" ry="6" />

          <rect x="285" y="334" width="70" height="10" rx="5" ry="5" />
          <rect x="265" y="350" width="90" height="16" rx="6" ry="6" />
        </ContentLoader>
      </div>
    </article>
  );
};

export default CartProductCardSkeleton;
