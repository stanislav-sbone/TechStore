import { useCompleteProfile } from '@/hooks/useCompleteProfile';
import styles from './CompleteProfile.module.css';

const CompleteProfile = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useCompleteProfile();

  return (
    <div className={styles.complete}>
      <div className={styles.card}>
        <h1 className={styles.title}>Заполните данные</h1>
        <p className={styles.subtitle}>
          Укажите основные данные для оформления заказов и доставки
        </p>

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
              className={
                errors.firstName
                  ? `${styles.input} ${styles.inputError}`
                  : styles.input
              }
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
              className={
                errors.lastName
                  ? `${styles.input} ${styles.inputError}`
                  : styles.input
              }
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
              className={
                errors.phone
                  ? `${styles.input} ${styles.inputError}`
                  : styles.input
              }
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
              className={
                errors.address
                  ? `${styles.input} ${styles.inputError}`
                  : styles.input
              }
              placeholder="г. Москва, ул. Тверская, д. 1"
              autoComplete="street-address"
              disabled={isSubmitting}
              {...register('address')}
            />
            {errors.address && (
              <span className={styles.error}>{errors.address.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
