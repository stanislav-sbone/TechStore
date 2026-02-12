import type { FC } from 'react';
import styles from './ProductCard.module.css'; // или ./ProductPrice.module.css

interface ProductPriceProps {
  price: number;
  discount?: number;
}

const ProductPrice: FC<ProductPriceProps> = ({ price, discount }) => {
  const hasDiscount = typeof discount === 'number' && discount > 0;
  const discountPrice = hasDiscount ? Math.round(price * (1 - discount)) : null;

  return (
    <div className={styles.priceBlock}>
      {hasDiscount && discountPrice && (
        <span className={styles.priceDiscount}>
          {discountPrice.toLocaleString('ru-RU')} ₽
        </span>
      )}

      <div className={styles.price}>
        <span className={hasDiscount ? styles.priceOld : undefined}>
          {price.toLocaleString('ru-RU')} ₽
        </span>

        {hasDiscount && (
          <span className={styles.discount}>-{discount * 100}%</span>
        )}
      </div>
    </div>
  );
};

export default ProductPrice;
