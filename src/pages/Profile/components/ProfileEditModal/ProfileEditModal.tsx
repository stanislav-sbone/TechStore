import { type FC, type MouseEvent } from 'react';
import { X } from 'lucide-react';
import { useEditProfile } from '@/hooks/useEditProfile';
import styles from './ProfileEditModal.module.css';

interface ProfileEditModalProps {
  closeModal: () => void;
}

const ProfileEditModal: FC<ProfileEditModalProps> = ({ closeModal }) => {
  const { user, register, errors, isSubmitting, handleSubmit, onSubmit } =
    useEditProfile();

  if (!user) {
    return null;
  }

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={(event) => handleBackdropClick(event)}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>Редактировать данные</h3>
          <button
            className={styles.closeButton}
            type="button"
            onClick={closeModal}
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
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
                disabled={isSubmitting}
                {...register('firstName')}
              />

              {errors.firstName && (
                <span className={styles.error}>{errors.firstName.message}</span>
              )}
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
                disabled={isSubmitting}
                {...register('lastName')}
              />

              {errors.lastName && (
                <span className={styles.error}>{errors.lastName.message}</span>
              )}
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
                disabled={isSubmitting}
                {...register('phone')}
              />

              {errors.phone && (
                <span className={styles.error}>{errors.phone.message}</span>
              )}
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
                disabled={isSubmitting}
                {...register('address')}
              />

              {errors.address && (
                <span className={styles.error}>{errors.address.message}</span>
              )}
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
                disabled={isSubmitting}
                {...register('email')}
              />

              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>
            <div className={styles.actions}>
              <button
                className={styles.cancelButton}
                type="button"
                disabled={isSubmitting}
                onClick={closeModal}
              >
                Отмена
              </button>
              <button
                className={styles.confirmButton}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
