import type { FC, MouseEvent } from 'react';
import { Minus, Plus, Trash } from 'lucide-react';
import { setCart } from '@/store/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Link } from 'react-router';
import { updateCart } from '@/services/user/userApi';
import { toast } from 'react-toastify';
import styles from './CartProductCard.module.css';

interface CartProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  discount?: number;
}

const CartProductCard: FC<CartProductCardProps> = ({
  id,
  image,
  title,
  price,
  quantity,
  discount,
}) => {
  const token = useAppSelector((state) => state.auth.token);
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const hasDiscount = typeof discount === 'number' && discount > 0;
  const productPrice = hasDiscount ? Math.round(price * (1 - discount)) : price;

  const handleRemoveClick = async () => {
    try {
      if (!token) return;

      const updatedCart = cart.filter((item) => item.productId !== id);
      const result = await updateCart(updatedCart, token);
      dispatch(setCart(result.items));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка избранных товаров';

      toast.error(message);
    }
  };

  const handleIncreaseClick = async (event: MouseEvent) => {
    try {
      event.stopPropagation();
      event.preventDefault();

      if (!token) return;

      const updatedCart = cart.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
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

      const product = cart.find((item) => item.productId === id);

      if (!product) return;

      if (product.quantity <= 1) {
        const updatedCart = cart.filter((item) => item.productId !== id);
        const result = await updateCart(updatedCart, token);
        dispatch(setCart(result.items));
        return;
      }

      const updatedCart = cart.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity - 1 } : item
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
    <article key={id} className={styles.item}>
      <div className={styles.itemImagePlaceholder}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      <div className={styles.itemInfo}>
        <div className={styles.itemHeader}>
          <Link to={`/product/${id}`}>
            <h2 className={styles.itemName}>{title}</h2>
          </Link>

          <button className={styles.removeButton} onClick={handleRemoveClick}>
            <Trash size={16} />
          </button>
        </div>

        <div className={styles.itemDetails}>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>Цена</span>
            <span className={styles.priceValue}>
              {productPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <div className={styles.quantityBlock}>
            <span className={styles.quantityLabel}>Количество</span>
            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                onClick={handleDecreaseClick}
              >
                <Minus size={12} strokeWidth={3} />
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={handleIncreaseClick}
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>
          </div>

          <div className={styles.itemTotalBlock}>
            <span className={styles.itemTotalLabel}>Сумма</span>
            <span className={styles.itemTotalValue}>
              {(productPrice * quantity).toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartProductCard;
