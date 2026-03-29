import { X } from 'lucide-react';
import { useCallback, type FC, type MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useIsMobile from '@/hooks/useIsMobile';
import { clearCart, setCart } from '@/store/features/cart/cartSlice';
import { updateCart } from '@/services/user/userApi';
import { toast } from 'react-toastify';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  closeConfirmModal: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ closeConfirmModal }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile(600);

  const handleBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        closeConfirmModal();
      }
    },
    [closeConfirmModal]
  );

  const handleConfirmClick = useCallback(async () => {
    try {
      if (!token) return;

      dispatch(clearCart());
      const result = await updateCart([], token);
      dispatch(setCart(result.items));
      closeConfirmModal();
      if (!isMobile) toast.success('Заказ оформлен');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка избранных товаров';

      toast.error(message);
    }
  }, [dispatch, closeConfirmModal, isMobile, token]);

  return (
    <div
      className={styles.backdrop}
      onClick={(event) => handleBackdropClick(event)}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>Оформление заказа</h3>
          <button className={styles.closeButton} onClick={closeConfirmModal}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>
          <p className={styles.text}>
            Перед оформлением заказа убедитесь в корректности ваших данных
          </p>
          <p className={styles.dataGrid}>
            <div className={styles.dataWrapper}>
              <p className={styles.dataLabel}>Фамилия</p>
              <p className={styles.dataValue}>{user?.lastName}</p>
            </div>
            <div className={styles.dataWrapper}>
              <p className={styles.dataLabel}>Имя</p>
              <p className={styles.dataValue}>{user?.firstName}</p>
            </div>
            <div className={styles.dataWrapper}>
              <p className={styles.dataLabel}>Телефон</p>
              <p className={styles.dataValue}>{user?.phone}</p>
            </div>
          </p>
          <div className={styles.dataWrapper}>
            <p className={styles.dataLabel}>Адрес доставки</p>
            <p className={styles.dataValue}>{user?.address}</p>
          </div>
          <div className={styles.buttons}>
            <button className={styles.cancelButton} onClick={closeConfirmModal}>
              Отмена
            </button>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmClick}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
