import { Link } from 'react-router';
import styles from './HomeLink.module.css';

const HomeLink = () => {
  return (
    <button className={styles.button}>
      <Link to="/">На главную</Link>
    </button>
  );
};

export default HomeLink;
