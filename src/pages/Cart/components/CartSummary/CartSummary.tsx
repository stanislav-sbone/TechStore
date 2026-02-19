import type { FC } from 'react';
import styles from './CartSummary.module.css';

interface CartSummaryProps {
  cartQuantity: number;
  sumPriceWithDiscount: number;
  sumPrice: number;
}

const CartSummary: FC<CartSummaryProps> = ({
  cartQuantity,
  sumPriceWithDiscount,
  sumPrice,
}) => {
  return (
    <aside className={styles.summary}>
      <h2 className={styles.summaryTitle}>Итого</h2>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Количество товаров</span>
        <span className={styles.summaryValue}>{cartQuantity}</span>
      </div>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Сумма заказа без скидки</span>
        <span className={styles.summaryValue}>
          {sumPrice.toLocaleString('ru-RU')} ₽
        </span>
      </div>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Скидка</span>
        <span className={styles.summaryValue}>
          <span className={styles.discount}>
            -{(sumPrice - sumPriceWithDiscount).toLocaleString('ru-RU')} ₽
          </span>
        </span>
      </div>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Сумма заказа</span>
        <span className={styles.summaryValue}>
          {sumPriceWithDiscount.toLocaleString('ru-RU')} ₽
        </span>
      </div>

      <button className={styles.checkoutButton}>Перейти к оформлению</button>

      <button className={styles.clearButton}>Очистить корзину</button>
    </aside>
  );
};

export default CartSummary;
