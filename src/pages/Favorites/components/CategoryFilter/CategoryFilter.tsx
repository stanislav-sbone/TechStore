import type { ProductCategory } from '@/types/product';
import type { FC } from 'react';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  currentCategory: 'Все' | ProductCategory;
  categories: Array<'Все' | ProductCategory>;
  setCategory: (category: 'Все' | ProductCategory) => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({
  currentCategory,
  categories,
  setCategory,
}) => {
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCategory(category)}
          className={
            currentCategory === category
              ? `${styles.category} ${styles.active}`
              : `${styles.category}`
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
