import { useAppSelector } from '@/store/hooks';
import { sumPriceCart } from '@/utils/sumPriceCart';
import { useEffect, useState } from 'react';

export const useCart = () => {
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  const cartProducts = cartItems
    .map(({ productId, quantity }) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return null;
      return { ...product, quantity };
    })
    .filter((item) => item !== null);

  const cartQuantity = cartProducts.reduce((acc, cur) => acc + cur.quantity, 0);
  const sumPriceWithDiscount = sumPriceCart(cartProducts);
  const sumPrice = cartProducts.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if ((e.key === 'Escape' && isClearModalOpen) || isConfirmModalOpen) {
        setIsClearModalOpen(false);
        setIsConfirmModalOpen(false);
      }
    };

    if (isClearModalOpen || isConfirmModalOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isClearModalOpen, isConfirmModalOpen]);

  return {
    cartProducts,
    cartQuantity,
    sumPriceWithDiscount,
    sumPrice,
    loading,
    error,
    isClearModalOpen,
    isConfirmModalOpen,
    openClearModal: () => setIsClearModalOpen(true),
    closeClearModal: () => setIsClearModalOpen(false),
    openConfirmModal: () => setIsConfirmModalOpen(true),
    closeConfirmModal: () => setIsConfirmModalOpen(false),
  };
};
