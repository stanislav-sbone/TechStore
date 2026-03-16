import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import useIsMobile from './useIsMobile';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { getCart, getCurrentUser, getFavorites } from '@/services/user/userApi';
import { logout, setUser } from '@/store/features/auth/authSlice';
import { setFavorites } from '@/store/features/favorites/favoritesSlice';
import { setCart } from '@/store/features/cart/cartSlice';
import { AUTH_TOKEN_KEY } from '@/constants/auth';
import { getProducts } from '@/store/features/products/productsSlice';

export const useLayout = () => {
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);
  const loading = useAppSelector((state) => state.products.loading);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        if (!token || user) return;

        const [userData, favorites, cart] = await Promise.all([
          getCurrentUser(token),
          getFavorites(token),
          getCart(token),
        ]);

        dispatch(setUser(userData.user));
        dispatch(setFavorites(favorites.items));
        dispatch(setCart(cart.items));
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        dispatch(logout());
      }
    };

    loadCurrentUser();
  }, [token, user, dispatch]);

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(getProducts());
    }
  }, [dispatch, loading]);

  return { isMobile };
};
