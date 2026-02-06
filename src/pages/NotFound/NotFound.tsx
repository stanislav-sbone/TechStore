import { Link } from 'react-router';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <img src="/notfound.png" alt="notFound" className={styles.image} />
      <p className={styles.text}>Страница не найдена</p>
      <Link to="/" className={styles.goBack}>
        Вернуться на главную
      </Link>
    </section>
  );
};

export default NotFound;
