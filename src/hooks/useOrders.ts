import { getOrders } from '@/services/user/userApi';
import { useAppSelector } from '@/store/hooks';
import type { UserOrders } from '@/types/order';
import { useEffect, useState } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState<UserOrders[]>([]);
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

  return { orders, loading, error };
};
