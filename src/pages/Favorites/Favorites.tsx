import { ProductCard } from '@/components/ProductCard';
import { NoMatches } from '@/components/NoMatches';
import { CategoryFilter, EmptyFavorites, FavoritesFilter } from './components';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useFavorites } from '@/hooks/useFavorites';
import styles from './Favorites.module.css';

const Favorites = () => {
  useDocumentTitle('Избранное');
  const {
    favoritesCount,
    filteredFavorites,
    categories,
    category,
    searchQuery,
    setCategory,
  } = useFavorites();

  if (favoritesCount === 0) {
    return (
      <section className={styles.favorites}>
        <EmptyFavorites />
      </section>
    );
  }

  return (
    <section className={styles.favorites}>
      <h1 className={styles.title}>Избранные товары</h1>
      <FavoritesFilter />
      <CategoryFilter
        currentCategory={category}
        categories={categories}
        setCategory={setCategory}
      />
      {filteredFavorites.length === 0 ? (
        <NoMatches value={searchQuery} />
      ) : (
        <div className={styles.productsGrid}>
          {filteredFavorites.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.images[0]}
              name={product.title}
              category={product.category}
              price={product.price}
              discount={product.discount}
              inStock={product.inStock}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
