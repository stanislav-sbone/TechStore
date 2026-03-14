import type { FC, MouseEvent } from 'react';
import { setCart } from '@/store/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Minus, Plus } from 'lucide-react';
import type { CartItem } from '@/types/cart';
import { updateCart } from '@/services/user/userApi';
import { toast } from 'react-toastify';
import styles from './QuantityControl.module.css';

interface QuantityControlProps {
  productId: number;
  cartItem: CartItem;
}

const QuantityControl: FC<QuantityControlProps> = ({ productId, cartItem }) => {
  const token = useAppSelector((state) => state.auth.token);
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleIncreaseClick = async (event: MouseEvent) => {
    try {
      event.stopPropagation();
      event.preventDefault();

      if (!token) return;

      const updatedCart = cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      const result = await updateCart(updatedCart, token);
      dispatch(setCart(result.items));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка избранных товаров';

      toast.error(message);
    }
  };

  const handleDecreaseClick = async (event: MouseEvent) => {
    try {
      event.stopPropagation();
      event.preventDefault();

      if (!token) return;

      const product = cart.find((item) => item.productId === productId);

      if (!product) return;

      if (product.quantity <= 1) {
        const updatedCart = cart.filter((item) => item.productId !== productId);
        const result = await updateCart(updatedCart, token);
        dispatch(setCart(result.items));
        return;
      }

      const updatedCart = cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      const result = await updateCart(updatedCart, token);
      dispatch(setCart(result.items));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка избранных товаров';

      toast.error(message);
    }
  };

  return (
    <div className={styles.quantity}>
      <button onClick={handleDecreaseClick} className={styles.quantityButton}>
        <Minus size={18} strokeWidth={3} />
      </button>
      <span className={styles.quantityValue}>{cartItem.quantity}</span>
      <button onClick={handleIncreaseClick} className={styles.quantityButton}>
        <Plus size={18} strokeWidth={3} />
      </button>
    </div>
  );
};

export default QuantityControl;
