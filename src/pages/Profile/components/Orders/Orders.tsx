import { useState, type FC } from 'react';
import type { UserOrders } from '@/types/order';
import OrderCard from '../OrderCard/OrderCard';
import styles from './Orders.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';

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

  const isMobile = useIsMobile(450);

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
        <div className={styles.pagination}>
          <button
            className={styles.chevron}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft size={isMobile ? 20 : 24} />
          </button>
          <div className={styles.pages}>
            {pages.map((_, i) => (
              <button
                key={i}
                className={
                  currentPage === i + 1
                    ? `${styles.pageButton} ${styles.currentPage}`
                    : styles.pageButton
                }
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            className={styles.chevron}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight size={isMobile ? 20 : 24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
