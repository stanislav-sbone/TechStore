import { getOrders } from '@/services/user/userApi';
import { useAppSelector } from '@/store/hooks';
import type { UserOrders } from '@/types/order';
import { useEffect, useMemo, useState } from 'react';
import useIsMobile from './useIsMobile';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';

export const useOrders = () => {
  const [orders, setOrders] = useState<UserOrders[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = useAppSelector((state) => state.auth.token);
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  const ordersPerPage = 5;
  const visiblePagesCount = isMobile ? 3 : 5;
  const pageStep = Math.floor(visiblePagesCount / 2);

  const lastOrderIndex = currentPage * ordersPerPage;
  const firstOrderIndex = lastOrderIndex - ordersPerPage;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const currentOrders = orders.slice(firstOrderIndex, lastOrderIndex);

  const visiblePages = useMemo(() => {
    if (totalPages <= visiblePagesCount) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = currentPage - pageStep;
    let endPage = currentPage + pageStep;

    if (currentPage <= pageStep + 1) {
      startPage = 1;
      endPage = visiblePagesCount;
    }

    if (currentPage >= totalPages - pageStep) {
      startPage = totalPages - visiblePagesCount + 1;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages, visiblePagesCount, pageStep]);

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
    setCurrentPage,
    incrementPage,
    decrementPage,
  };
};
