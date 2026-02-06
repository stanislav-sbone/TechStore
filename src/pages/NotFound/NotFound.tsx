import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <img src="/notfound.png" alt="notFound" className={styles.image} />
      <p className={styles.text}>Страница не найдена</p>
    </section>
  );
};

export default NotFound;
