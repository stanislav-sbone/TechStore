import { useState, type FC } from 'react';
import type { UserOrders } from '@/types/order';
import OrderCard from '../OrderCard/OrderCard';
import Pagination from '../Pagination/Pagination';
import styles from './Orders.module.css';

interface OrdersProps {
  orders: UserOrders[];
  loading: boolean;
  error: string;
}

const Orders: FC<OrdersProps> = ({ orders, loading, error }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ordersPerPage = 5;
  const lastOrderIndex = currentPage * ordersPerPage;
  const firstOrderIndex = lastOrderIndex - ordersPerPage;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const currentOrders = orders.slice(firstOrderIndex, lastOrderIndex);
  const pages = new Array(totalPages).fill(null);

  const incrementPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const decrementPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
        {currentOrders.map((order) => (
          <OrderCard
            key={order.id}
            items={order.items}
            totalAmount={order.totalAmount}
            orderNumber={order.orderNumber}
            createdAt={order.created_at}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pages={pages}
          setCurrentPage={setCurrentPage}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
        />
      )}
    </div>
  );
};

export default Orders;
