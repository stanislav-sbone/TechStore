import type { FC } from 'react';
import { Star } from 'lucide-react';
import type { ProductCategory } from '@/types/product';
import styles from './ProductCategoryBrand.module.css';

interface ProductCategoryProps {
  rating: number;
  category: ProductCategory;
  brand: string;
}

const ProductCategoryBrand: FC<ProductCategoryProps> = ({
  rating,
  category,
  brand,
}) => {
  return (
    <div className={styles.categoryRating}>
      <div className={styles.rating}>
        <Star size={18} fill="currentColor" />
        <span>{rating}</span>
      </div>
      <p>
        {category} • {brand}
      </p>
    </div>
  );
};

export default ProductCategoryBrand;
