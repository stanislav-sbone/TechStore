import type { FC } from 'react';
import ContentLoader from 'react-content-loader';
import styles from './CartSummarySkeleton.module.css';

const CartSummarySkeleton: FC = () => {
  return (
    <aside className={styles.summary}>
      <ContentLoader
        speed={2}
        width="100%"
        height={280}
        viewBox="0 0 320 280"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 280 }}
      >
        {/* Хедер */}
        <rect x="0" y="0" width="110" height="18" rx="6" ry="6" />

        {/* Строки */}
        <rect x="0" y="40" width="120" height="14" rx="6" ry="6" />
        <rect x="280" y="38" width="40" height="14" rx="6" ry="6" />

        <rect x="0" y="70" width="150" height="14" rx="6" ry="6" />
        <rect x="260" y="68" width="60" height="14" rx="6" ry="6" />

        <rect x="0" y="100" width="90" height="14" rx="6" ry="6" />
        <rect x="270" y="98" width="50" height="14" rx="6" ry="6" />

        <rect x="0" y="130" width="120" height="14" rx="6" ry="6" />
        <rect x="260" y="128" width="60" height="14" rx="6" ry="6" />

        {/* Кнопки */}
        <rect x="0" y="176" width="320" height="42" rx="21" ry="21" />
        <rect x="0" y="232" width="320" height="42" rx="19" ry="19" />
      </ContentLoader>
    </aside>
  );
};

export default CartSummarySkeleton;
