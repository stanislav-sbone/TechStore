import { Link } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import styles from './Register.module.css';

const Register = () => {
  return (
    <div className={styles.register}>
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>
          Создайте аккаунт, чтобы управлять своими заказами, избранным и
          корзиной
        </p>

        <form className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="email@example.com"
            />
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
            />
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
            />
          </div>

          <div className={styles.field}>
            <div className={styles.checkboxRow}>
              <input
                type="checkbox"
                id="personalData"
                className={styles.checkboxInput}
              />
              <label htmlFor="personalData" className={styles.checkboxLabel}>
                Я соглашаюсь на обработку моих персональных данных и принимаю{' '}
                <button type="button" className={styles.checkboxLink}>
                  политику конфиденциальности
                </button>
              </label>
            </div>
          </div>

          <button type="submit" className={styles.submit}>
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
