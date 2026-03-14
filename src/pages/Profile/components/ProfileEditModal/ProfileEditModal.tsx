import { X } from 'lucide-react';
import styles from './ProfileEditModal.module.css';
import { useAppSelector } from '@/store/hooks';
import { useCallback, type FC, type MouseEvent } from 'react';

interface ProfileEditModalProps {
  closeModal: () => void;
}

const ProfileEditModal: FC<ProfileEditModalProps> = ({ closeModal }) => {
  const user = useAppSelector((state) => state.auth.user);

  const handleBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  if (!user) {
    return null;
  }

  const onSubmit = () => {
    console.log('редактирование данных');
  };

  return (
    <div
      className={styles.backdrop}
      onClick={(event) => handleBackdropClick(event)}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>Редактировать данные</h3>
          <button className={styles.closeButton} onClick={closeModal}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>
          <form className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.label}>
                Имя
              </label>
              <input
                type="text"
                id="firstName"
                className={styles.input}
                placeholder="Иван"
                autoComplete="given-name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.label}>
                Фамилия
              </label>
              <input
                type="text"
                id="lastName"
                className={styles.input}
                placeholder="Иванов"
                autoComplete="family-name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Номер телефона
              </label>
              <input
                type="tel"
                id="phone"
                className={styles.input}
                placeholder="+79876543210"
                autoComplete="tel"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="address" className={styles.label}>
                Адрес доставки
              </label>
              <input
                type="text"
                id="address"
                className={styles.input}
                placeholder="г. Москва, ул. Тверская, д. 1"
                autoComplete="street-address"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Электронная почта
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="email@example.com"
                autoComplete="email"
              />
            </div>
            <div className={styles.actions}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={closeModal}
              >
                Отмена
              </button>
              <button
                className={styles.confirmButton}
                type="button"
                onClick={onSubmit}
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
