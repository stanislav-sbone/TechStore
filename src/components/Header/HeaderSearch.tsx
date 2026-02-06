import { Search, X } from 'lucide-react';
import styles from './Header.module.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/store/features/productsSlice';

const HeaderSearch = () => {
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const dispatch = useAppDispatch();

  const clearInput = () => {
    dispatch(setSearchQuery(''));
  };

  return (
    <div className={styles.searchHolder}>
      <span className={styles.searchIcon}>
        <Search color="#909cb2" size={23} />
      </span>
      <input
        className={styles.search}
        type="text"
        placeholder="Искать в TechStore"
        value={searchQuery}
        onChange={(event) => dispatch(setSearchQuery(event.target.value))}
      />
      {searchQuery && (
        <button className={styles.closeButton} onClick={clearInput}>
          <X color="#909cb2" size={23} />
        </button>
      )}
    </div>
  );
};

export default HeaderSearch;
