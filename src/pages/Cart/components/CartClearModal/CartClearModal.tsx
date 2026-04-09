import { X } from 'lucide-react';
import { useCallback, type FC, type MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart, setCart } from '@/store/features/cart/cartSlice';
import styles from './CartClearModal.module.css';
import { toast } from 'react-toastify';
import useIsMobile from '@/hooks/useIsMobile';
import { updateCart } from '@/services/user/userApi';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';

interface CartClearModalProps {
  closeClearModal: () => void;
}

const CartClearModal: FC<CartClearModalProps> = ({ closeClearModal }) => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  const handleBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        closeClearModal();
      }
    },
    [closeClearModal]
  );

  const handleConfirmClick = useCallback(async () => {
    try {
      if (!token) return;

      dispatch(clearCart());
      const result = await updateCart([], token);
      dispatch(setCart(result.items));
      closeClearModal();
      if (!isMobile) toast.success('Корзина очищена');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка корзины товаров';

      toast.error(message);
    }
  }, [dispatch, closeClearModal, isMobile, token]);

  return (
    <div
      className={styles.backdrop}
      onClick={(event) => handleBackdropClick(event)}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>Подтвердите действие</h3>
          <button
            className={styles.closeButton}
            onClick={() => closeClearModal()}
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>
          <p className={styles.text}>
            Вы действительно хотите очистить корзину?
          </p>
          <div className={styles.buttons}>
            <button
              className={styles.cancelButton}
              onClick={() => closeClearModal()}
            >
              Отмена
            </button>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmClick}
            >
              Да
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClearModal;
