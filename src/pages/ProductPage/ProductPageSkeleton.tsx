import React from 'react';
import ContentLoader from 'react-content-loader';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import styles from './ProductPage.module.css';

const ProductPageSkeleton: React.FC = () => {
  return (
    <section>
      <Link to="/" className={styles.backLink}>
        <ArrowLeft size={20} />
        Назад к каталогу
      </Link>

      <article className={styles.product}>
        <div className={styles.gallery}>
          <ContentLoader
            speed={2}
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#e0e0e0"
          >
            <rect x="0" y="0" rx="12" ry="12" width="400" height="400" />
          </ContentLoader>
        </div>

        <div className={styles.info}>
          <div className={styles.badges}>
            <ContentLoader
              speed={2}
              width={220}
              height={28}
              viewBox="0 0 220 28"
              backgroundColor="#f3f3f3"
              foregroundColor="#e0e0e0"
            >
              <rect x="0" y="4" rx="12" ry="12" width="90" height="20" />
              <rect x="100" y="4" rx="12" ry="12" width="80" height="20" />
            </ContentLoader>
          </div>

          <div>
            <ContentLoader
              speed={2}
              width={320}
              height={32}
              viewBox="0 0 320 32"
              backgroundColor="#f3f3f3"
              foregroundColor="#e0e0e0"
            >
              <rect x="0" y="6" rx="6" ry="6" width="280" height="20" />
            </ContentLoader>
          </div>

          <div className={styles.categoryRating}>
            <ContentLoader
              speed={2}
              width={260}
              height={40}
              viewBox="0 0 260 40"
              backgroundColor="#f3f3f3"
              foregroundColor="#e0e0e0"
            >
              <rect x="0" y="10" rx="6" ry="6" width="200" height="25" />
            </ContentLoader>
          </div>

          <div className={styles.priceFavorite}>
            <div className={styles.priceBlock}>
              <ContentLoader
                speed={2}
                width={200}
                height={44}
                viewBox="0 0 200 44"
                backgroundColor="#f3f3f3"
                foregroundColor="#e0e0e0"
              >
                <rect x="0" y="5" rx="6" ry="6" width="150" height="35" />
              </ContentLoader>
            </div>
          </div>

          <div className={styles.stock}>
            <ContentLoader
              speed={2}
              width={120}
              height={20}
              viewBox="0 0 120 20"
              backgroundColor="#f3f3f3"
              foregroundColor="#e0e0e0"
            >
              <rect x="0" y="2" rx="10" ry="10" width="110" height="16" />
            </ContentLoader>
          </div>

          <div>
            <ContentLoader
              speed={2}
              width={220}
              height={44}
              viewBox="0 0 220 44"
              backgroundColor="#f3f3f3"
              foregroundColor="#e0e0e0"
            >
              <rect x="0" y="0" rx="10" ry="10" width="220" height="44" />
            </ContentLoader>
          </div>

          <div className={styles.description}>
            <ContentLoader
              speed={2}
              width="100%"
              height="100%"
              viewBox="0 0 400 90"
              backgroundColor="#f3f3f3"
              foregroundColor="#e0e0e0"
            >
              <rect x="0" y="0" rx="6" ry="6" width="120" height="18" />

              <rect x="0" y="26" rx="4" ry="4" width="360" height="12" />
              <rect x="0" y="44" rx="4" ry="4" width="340" height="12" />
              <rect x="0" y="62" rx="4" ry="4" width="350" height="12" />
              <rect x="0" y="78" rx="4" ry="4" width="320" height="12" />
            </ContentLoader>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProductPageSkeleton;
