import { type FC } from 'react';
import type { UserOrders } from '@/types/order';
import OrderCard from '../OrderCard/OrderCard';
import styles from './Orders.module.css';

interface OrdersProps {
  orders: UserOrders[];
  loading: boolean;
  error: string;
}

const Orders: FC<OrdersProps> = ({ orders, loading, error }) => {
  if (loading) {
    return (
      <div className={styles.orders}>
        <h3 className={styles.title}>История заказов</h3>
        <p className={styles.message}>Загрузка заказов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.orders}>
        <h3 className={styles.title}>История заказов</h3>
        <p className={styles.message}>Произошла ошибка загрузки заказов</p>
      </div>
    );
  }

  if (!loading && orders.length === 0) {
    return (
      <div className={styles.orders}>
        <h3 className={styles.title}>История заказов</h3>
        <p className={styles.message}>Здесь будет ваша история заказов</p>
      </div>
    );
  }

  return (
    <div className={styles.orders}>
      <h3 className={styles.title}>История заказов</h3>
      <div className={styles.ordersList}>
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            items={order.items}
            totalAmount={order.totalAmount}
            orderNumber={order.orderNumber}
            createdAt={order.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
