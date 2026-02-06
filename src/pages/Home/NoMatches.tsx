import styles from './Home.module.css';

const NoMatches = () => {
  return (
    <div className={styles.noMatches}>
      <img
        src="/nomatches.png"
        alt="nomatches"
        className={styles.noMatchesImage}
      />
      <p className={styles.message}>Ничего не найдено</p>
      <p className={styles.submessage}>Попробуйте изменить запрос</p>
    </div>
  );
};

export default NoMatches;
