import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { HomeLink } from '@/components/HomeLink';
import styles from './NotFound.module.css';

const NotFound = () => {
  useDocumentTitle('Произошла ошибка');
  return (
    <section className={styles.notFound}>
      <img src="/notfound.png" alt="notFound" className={styles.image} />
      <p className={styles.message}>Страница не найдена</p>
      <p className={styles.submessage}>
        Вероятно страницы не существует, или она находится в разработке
      </p>
      <HomeLink />
    </section>
  );
};

export default NotFound;
