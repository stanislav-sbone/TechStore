import type { FC } from 'react';
import { Trash } from 'lucide-react';
import styles from './CartProductCard.module.css';

interface CartProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  discount?: number;
}

const CartProductCard: FC<CartProductCardProps> = ({
  id,
  image,
  title,
  price,
  quantity,
  discount,
}) => {
  const hasDiscount = typeof discount === 'number' && discount > 0;
  const productPrice = hasDiscount ? Math.round(price * (1 - discount)) : price;

  return (
    <article key={id} className={styles.item}>
      <div className={styles.itemImagePlaceholder}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      <div className={styles.itemInfo}>
        <div className={styles.itemHeader}>
          <h2 className={styles.itemName}>{title}</h2>

          <button className={styles.removeButton}>
            <Trash size={16} />
          </button>
        </div>

        <div className={styles.itemDetails}>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>Цена</span>
            <span className={styles.priceValue}>
              {productPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <div className={styles.quantityBlock}>
            <span className={styles.quantityLabel}>Количество</span>
            <div className={styles.quantityControls}>
              <button className={styles.quantityButton}>−</button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button className={styles.quantityButton}>+</button>
            </div>
          </div>

          <div className={styles.itemTotalBlock}>
            <span className={styles.itemTotalLabel}>Сумма</span>
            <span className={styles.itemTotalValue}>
              {(productPrice * quantity).toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartProductCard;
