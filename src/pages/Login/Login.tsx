import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from './login.schema';
import styles from './Login.module.css';
import { Link } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('login data:', data);
    console.log(typeof data.email);
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>
          Необходима авторизация для управления аккаунтом, избранным и корзиной
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>

            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              className={styles.input}
              {...register('email')}
            />

            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>
                Пароль
              </label>

              <button type="button" className={styles.linkButton}>
                Забыли пароль?
              </button>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              className={styles.input}
              {...register('password')}
            />

            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            Войти
          </button>
        </form>
        <p className={styles.footer}>
          Нет аккаунта?{' '}
          <Link to={ROUTES.REGISTER} className={styles.linkButton}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
