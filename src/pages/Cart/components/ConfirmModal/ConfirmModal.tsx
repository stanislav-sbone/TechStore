import { X } from 'lucide-react';
import { useCallback, type FC, type MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/features/cart/cartSlice';
import { createOrder } from '@/services/user/userApi';
import { toast } from 'react-toastify';
import UserData from '../UserData/UserData';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  closeConfirmModal: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ closeConfirmModal }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        closeConfirmModal();
      }
    },
    [closeConfirmModal]
  );

  const handleConfirmClick = async () => {
    try {
      if (!token || !user) return;

      navigate(ROUTES.SUCCESS);
      createOrder(token);
      dispatch(clearCart());
      closeConfirmModal();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка оформления заказа';

      toast.error(message);
    }
  };

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
          {user?.isProfileCompleted ? (
            <>
              <p className={styles.text}>
                Перед оформлением заказа убедитесь в корректности ваших данных
              </p>
              <UserData
                lastName={user.lastName ?? ''}
                firstName={user.firstName ?? ''}
                phone={user.phone ?? ''}
                address={user.address ?? ''}
              />
            </>
          ) : (
            <p className={styles.text}>
              Не удалось загрузить данные пользователя. Заполните свои данные в
              личном кабинете
            </p>
          )}

          <div className={styles.buttons}>
            <button className={styles.cancelButton} onClick={closeConfirmModal}>
              Отмена
            </button>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmClick}
              disabled={!user?.isProfileCompleted}
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
