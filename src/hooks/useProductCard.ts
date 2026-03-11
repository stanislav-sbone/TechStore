import type { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useIsMobile from './useIsMobile';
import { toggleFavorite } from '@/store/features/favorites/favoritesSlice';
import { addToCart } from '@/store/features/cart/cartSlice';
import { toast } from 'react-toastify';
import { useRequireAuth } from './useRequireAuth';

export const useProductCard = (id: number) => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const isMobile = useIsMobile(600);
  const { requireAuth } = useRequireAuth();

  const isFavorite = favorites.includes(id);
  const cartItem = cart.find((product) => product.productId === id);

  const handleFavoriteClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!requireAuth()) return;

    dispatch(toggleFavorite(id));
  };

  const handleCartClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!requireAuth()) return;

    dispatch(addToCart(id));
    if (!isMobile) toast.success('Товар добавлен в корзину');
  };

  return { isFavorite, cartItem, handleFavoriteClick, handleCartClick };
};
