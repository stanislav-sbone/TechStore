import { ROUTES } from '@/routes/constants/routes';
import { Link } from 'react-router';
import styles from './Footer.module.css';

const Footer = () => {
  const currentDate = new Date();

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          TechStore
        </Link>
        <div className={styles.content}>
          <div className={styles.footerLinks}>
            <Link to={ROUTES.HOME} className={styles.link}>
              Главная
            </Link>
            <Link to={ROUTES.FAVORITES} className={styles.link}>
              Избранное
            </Link>
            <Link to={ROUTES.CART} className={styles.link}>
              Корзина
            </Link>
            <Link to={ROUTES.PROFILE} className={styles.link}>
              Личный кабинет
            </Link>
          </div>
          <div className={styles.footerLinks}>
            <Link to="/" className={styles.link}>
              О нас
            </Link>
            <Link to="/" className={styles.link}>
              Контакты
            </Link>
            <Link to="/" className={styles.link}>
              Вакансии
            </Link>
            <Link to="/" className={styles.link}>
              Соглашения
            </Link>
          </div>
          <div className={styles.footerLinks}>
            <Link to="/" className={styles.link}>
              Доставка
            </Link>
            <Link to="/" className={styles.link}>
              Возврат товаров
            </Link>
            <Link to="/" className={styles.link}>
              Проверка качества
            </Link>
            <Link to="/" className={styles.link}>
              Гарантии
            </Link>
          </div>
          <div className={styles.payment}>
            <a href="">
              <img
                src="/common/sbp.svg"
                alt="СБП"
                className={styles.payImage}
              />
            </a>
          </div>
        </div>
        <p className={styles.footerSign}>
          © Stanislav Borisenko | {currentDate.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
