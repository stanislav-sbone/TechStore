import type { FC, MouseEvent } from 'react';
import { updateQuantity, type CartItem } from '@/store/features/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { Minus, Plus } from 'lucide-react';
import styles from './QuantityControl.module.css';

interface QuantityControlProps {
  productId: number;
  cartItem: CartItem;
}

const QuantityControl: FC<QuantityControlProps> = ({ productId, cartItem }) => {
  const dispatch = useAppDispatch();

  const handleIncreaseClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(
      updateQuantity({ productId: productId, quantity: cartItem.quantity + 1 })
    );
  };

  const handleDecreaseClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(
      updateQuantity({ productId: productId, quantity: cartItem.quantity - 1 })
    );
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
