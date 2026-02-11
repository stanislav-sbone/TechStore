import type { FC } from 'react';
import { FavoriteButton } from '../FavoriteButton';
import styles from './ProductPrice.module.css';

interface ProductPriceProps {
  productID: number;
  discountPrice: number | null;
  price: number;
  isFavorite: boolean;
}

const ProductPrice: FC<ProductPriceProps> = ({
  productID,
  discountPrice,
  price,
  isFavorite,
}) => {
  return (
    <div className={styles.priceFavorite}>
      <div className={styles.priceBlock}>
        {discountPrice != null && (
          <span className={styles.priceDiscount}>
            {discountPrice.toLocaleString('ru-RU')} ₽
          </span>
        )}
        <span
          className={`${styles.price} ${discountPrice != null ? styles.priceOld : ''}`}
        >
          {price.toLocaleString('ru-RU')} ₽
        </span>
      </div>
      <FavoriteButton productID={productID} isFavorite={isFavorite} />
    </div>
  );
};

export default ProductPrice;
