import { Link } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { registerSchema, type RegisterFormData } from './register.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './Register.module.css';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      personalData: false,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('register data', data);
  };

  return (
    <div className={styles.register}>
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>
          Создайте аккаунт, чтобы управлять своими заказами, избранным и
          корзиной
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
              {...register('email')}
            />

            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="Придумайте пароль"
              autoComplete="new-password"
              {...register('password')}
            />

            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Подтверждение пароля
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.input}
              placeholder="Повторите пароль"
              autoComplete="new-password"
              {...register('confirmPassword')}
            />

            {errors.confirmPassword && (
              <span className={styles.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.checkboxRow}>
              <input
                type="checkbox"
                id="personalData"
                className={styles.checkboxInput}
                {...register('personalData')}
              />
              <label htmlFor="personalData" className={styles.checkboxLabel}>
                Я соглашаюсь на обработку моих персональных данных и принимаю{' '}
                <button type="button" className={styles.checkboxLink}>
                  политику конфиденциальности
                </button>
              </label>
            </div>
            {errors.personalData && (
              <span className={styles.error}>
                {errors.personalData.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            Зарегистрироваться
          </button>
        </form>

        <p className={styles.footer}>
          Уже есть аккаунт?{' '}
          <Link to={ROUTES.LOGIN} className={styles.loginLink}>
            Войдите в систему
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
