import CategoryFilter from '../CategoryFilter/CategoryFilter';
import styles from './HomeHeader.module.css';

const HomeHeader = () => {
  return (
    <>
      <h1 className={styles.title}>Каталог товаров</h1>
      <CategoryFilter />
    </>
  );
};

export default HomeHeader;
