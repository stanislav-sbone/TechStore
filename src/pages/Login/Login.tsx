import { Link } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin } from '@/hooks/useLogin';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import styles from './Login.module.css';

const Login = () => {
  useDocumentTitle('Вход');
  const {
    location,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isPasswordVisible,
    passwordValue,
    onSubmit,
    togglePasswordVisibility,
  } = useLogin();

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
              autoComplete="email"
              disabled={isSubmitting}
              className={
                errors.email
                  ? `${styles.input} ${styles.inputError}`
                  : styles.input
              }
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

            <div className={styles.passwordWrapper}>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Введите пароль"
                autoComplete="current-password"
                disabled={isSubmitting}
                className={
                  errors.password
                    ? `${styles.input} ${styles.inputError}`
                    : styles.input
                }
                {...register('password')}
              />

              {Boolean(passwordValue) && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.passwordButton}
                  disabled={isSubmitting}
                >
                  {isPasswordVisible ? (
                    <EyeOff size={20} color="#4a5568" />
                  ) : (
                    <Eye size={20} color="#4a5568" />
                  )}
                </button>
              )}
            </div>

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
          <Link
            to={ROUTES.REGISTER}
            className={styles.linkButton}
            state={location.state}
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
