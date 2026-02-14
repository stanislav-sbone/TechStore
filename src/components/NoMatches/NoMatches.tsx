import type { FC } from 'react';
import styles from './NoMatches.module.css';

interface NoMatchesProps {
  value: string;
}

const NoMatches: FC<NoMatchesProps> = ({ value }) => {
  return (
    <div className={styles.noMatches}>
      <img
        src="/nomatches.png"
        alt="nomatches"
        className={styles.noMatchesImage}
      />
      <p className={styles.message}>
        По запросу <span className={styles.value}>{value}</span> ничего не
        найдено
      </p>
      <p className={styles.submessage}>Попробуйте изменить запрос</p>
    </div>
  );
};

export default NoMatches;
