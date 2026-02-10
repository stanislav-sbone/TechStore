import { Search, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/store/features/favorites/favoritesSlice';
import styles from './Favorites.module.css';

const FavoritesFilter = () => {
  const searchQuery = useAppSelector((state) => state.favorites.searchQuery);
  const dispatch = useAppDispatch();

  const clearInput = () => {
    dispatch(setSearchQuery(''));
  };

  return (
    <div className={styles.filterWrapper}>
      <span className={styles.filterIcon}>
        <Search color="#909cb2" size={23} />
      </span>
      <input
        className={styles.filter}
        type="text"
        placeholder="Искать в избранных"
        value={searchQuery}
        onChange={(event) => dispatch(setSearchQuery(event.target.value))}
      />
      {searchQuery && (
        <button className={styles.clearButton} onClick={clearInput}>
          <X color="#909cb2" size={23} />
        </button>
      )}
    </div>
  );
};

export default FavoritesFilter;
