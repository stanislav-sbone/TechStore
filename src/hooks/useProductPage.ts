import type { Product } from '@/types/product';
import { useEffect, useMemo, useState } from 'react';
import useIsMobile from './useIsMobile';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductById } from '@/services/api';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { addToCart } from '@/store/features/cart/cartSlice';

export const useProductPage = () => {
  const { id } = useParams();
  const productID = Number(id);

  const favorites = useAppSelector((state) => state.favorites.items);
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile(600);

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

  const handleCartClick = () => {
    dispatch(addToCart(productID));
    if (!isMobile) toast.success('Товар добавлен в корзину');
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
