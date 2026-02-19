import { X } from 'lucide-react';
import { useCallback, type FC, type MouseEvent } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/features/cart/cartSlice';
import styles from './CartClearModal.module.css';

interface CartClearModalProps {
  setIsClearModalOpen: (state: boolean) => void;
}

const CartClearModal: FC<CartClearModalProps> = ({ setIsClearModalOpen }) => {
  const dispatch = useAppDispatch();

  const handleBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        setIsClearModalOpen(false);
      }
    },
    [setIsClearModalOpen]
  );

  const handleConfirmClick = useCallback(() => {
    dispatch(clearCart());
    setIsClearModalOpen(false);
  }, [dispatch, setIsClearModalOpen]);

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
            onClick={() => setIsClearModalOpen(false)}
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
              onClick={() => setIsClearModalOpen(false)}
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
