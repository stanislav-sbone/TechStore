import { useEffect, useState } from 'react';
import { getOrders } from '@/services/user/userApi';
import { useAppSelector } from '@/store/hooks';
import type { OrdersResponse } from '@/types/order';
import { formatDate } from '@/utils/formatDate';
import styles from './Orders.module.css';

const Orders = () => {
  const [orders, setOrders] = useState<OrdersResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        if (!token) return;
        const result = await getOrders(token);

        setOrders(result);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Ошибка получения истории заказов';

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className={styles.orders}>
        <h3 className={styles.title}>История заказов</h3>
        <p>Загрузка заказов</p>
      </div>
    );
  }

  if (!loading && orders.length === 0) {
    <div className={styles.orders}>
      <h3 className={styles.title}>История заказов</h3>
      <p>Здесь будет ваша история заказов</p>
    </div>;
  }

  if (error) {
    return (
      <div className={styles.orders}>
        <h3 className={styles.title}>История заказов</h3>
        <p>Произошла ошибка загрузки заказов</p>
      </div>
    );
  }

  return (
    <div className={styles.orders}>
      <h3 className={styles.title}>История заказов</h3>
      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div className={styles.orderCard}>
            <div className={styles.info}>
              <h4 className={styles.orderNumber}>Заказ №{order.orderNumber}</h4>
              <div className={styles.items}>
                {order.items.map((item) => (
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.image}
                  />
                ))}
              </div>
            </div>
            <div className={styles.summary}>
              <p className={styles.date}>от: {formatDate(order.created_at)}</p>
              <p className={styles.totalAmount}>
                Сумма: {order.totalAmount.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
