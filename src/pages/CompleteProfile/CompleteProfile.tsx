import { useForm } from 'react-hook-form';
import {
  completeProfileSchema,
  type CompleteProfileData,
} from './complete.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './CompleteProfile.module.css';
import { completeProfile } from '@/services/users/usersApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { updateUser } from '@/store/features/auth/authSlice';

const CompleteProfile = () => {
  const token = useAppSelector((state) => state.auth.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileData>({
    resolver: zodResolver(completeProfileSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.HOME;

  const onSubmit = async (data: CompleteProfileData) => {
    try {
      if (!token) {
        throw new Error('Пользователь не авторизован');
      }

      const result = await completeProfile(data, token);
      dispatch(updateUser(result.user));
      toast.success(result.message);
      navigate(from, { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка заполнения данных';

      toast.error(message);
    }
  };

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
