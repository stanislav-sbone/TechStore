import { setCategory } from '@/store/features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CATEGORIES } from '@/constants/categories';
import styles from './Home.module.css';

const CategoryFilter = () => {
  const category = useAppSelector((state) => state.products.category);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.categories}>
      {CATEGORIES.map((c) => (
        <button
          key={c.value}
          onClick={() => dispatch(setCategory(c.value))}
          className={
            c.value === category
              ? `${styles.category} ${styles.active}`
              : `${styles.category}`
          }
        >
          {c.title}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
