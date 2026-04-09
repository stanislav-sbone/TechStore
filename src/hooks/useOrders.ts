import { getOrders } from '@/services/user/userApi';
import { useAppSelector } from '@/store/hooks';
import type { UserOrders } from '@/types/order';
import { useEffect, useMemo, useState } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState<UserOrders[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = useAppSelector((state) => state.auth.token);

  const ordersPerPage = 5;
  const visiblePagesCount = 5;

  const lastOrderIndex = currentPage * ordersPerPage;
  const firstOrderIndex = lastOrderIndex - ordersPerPage;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const currentOrders = orders.slice(firstOrderIndex, lastOrderIndex);

  const visiblePages = useMemo(() => {
    if (totalPages <= visiblePagesCount) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = visiblePagesCount;
    }

    if (currentPage >= totalPages - 2) {
      startPage = totalPages - visiblePagesCount + 1;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages]);

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');

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

  return {
    orders,
    loading,
    error,
    currentPage,
    currentOrders,
    totalPages,
    visiblePages,
    visiblePagesCount,
    setCurrentPage,
    incrementPage,
    decrementPage,
  };
};
