import type { FC } from 'react';
import { Minus, Plus, Trash } from 'lucide-react';
import styles from './CartProductCard.module.css';
import {
  removeFromCart,
  updateQuantity,
} from '@/store/features/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { Link } from 'react-router';

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
  const dispatch = useAppDispatch();

  const hasDiscount = typeof discount === 'number' && discount > 0;
  const productPrice = hasDiscount ? Math.round(price * (1 - discount)) : price;

  const handleRemoveClick = () => {
    dispatch(removeFromCart(id));
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
                onClick={() =>
                  dispatch(
                    updateQuantity({ productId: id, quantity: quantity - 1 })
                  )
                }
              >
                <Minus size={12} strokeWidth={3} />
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() =>
                  dispatch(
                    updateQuantity({ productId: id, quantity: quantity + 1 })
                  )
                }
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
