import type { Product } from '@/types/product';
import { useEffect, useMemo, useState } from 'react';
import useIsMobile from './useIsMobile';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { setCart } from '@/store/features/cart/cartSlice';
import { fetchProductById } from '@/services/products/productsApi';
import { useRequireAuth } from './useRequireAuth';
import { updateCart } from '@/services/user/userApi';

export const useProductPage = () => {
  const { id } = useParams();
  const productID = Number(id);

  const favorites = useAppSelector((state) => state.favorites.items);
  const cart = useAppSelector((state) => state.cart.items);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile(600);
  const { requireAuth } = useRequireAuth();

  const isFavorite = favorites.includes(productID);
  const cartItem = cart.find((product) => product.productId === productID);

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchProductById(productID);
        setProduct(response);
      } catch (error) {
        console.error(error);
        setError('Не удалось загрузить товар. Попробуйте позже');
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [productID]);

  const handleCartClick = async () => {
    try {
      if (!requireAuth() || !token) return;

      const product = {
        productId: productID,
        quantity: 1,
      };

      const updatedCart = [...cart, product];

      const result = await updateCart(updatedCart, token);

      dispatch(setCart(result.items));
      if (!isMobile) toast.success('Товар добавлен в корзину');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка избранных товаров';

      toast.error(message);
    }
  };

  const discountPrice = useMemo(() => {
    return product && product.discount
      ? Math.round(product.price * (1 - product.discount))
      : null;
  }, [product]);

  return {
    product,
    productID,
    isLoading,
    error,
    isFavorite,
    cartItem,
    discountPrice,
    handleCartClick,
  };
};
