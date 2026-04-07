import type { OrderItem } from '@/types/order';
import type { FC } from 'react';
import { formatDate } from '@/utils/formatDate';
import styles from './OrderCard.module.css';

interface OrderCardProps {
  items: OrderItem[];
  orderNumber: number;
  createdAt: string;
  totalAmount: number;
}

const OrderCard: FC<OrderCardProps> = ({
  items,
  orderNumber,
  createdAt,
  totalAmount,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h4 className={styles.orderNumber}>Заказ №{orderNumber}</h4>
        <div className={styles.items}>
          {items.map((item) => (
            <img
              src={item.image}
              alt={item.title}
              className={styles.image}
              key={item.productId}
            />
          ))}
        </div>
      </div>
      <div className={styles.summary}>
        <p className={styles.date}>от: {formatDate(createdAt)}</p>
        <p className={styles.totalAmount}>
          Сумма: {totalAmount.toLocaleString('ru-RU')} ₽
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
