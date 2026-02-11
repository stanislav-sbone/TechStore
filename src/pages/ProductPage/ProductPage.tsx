import { Link, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Star, ArrowLeft, Heart } from 'lucide-react';
import ProductNotFound from './ProductNotFound';
import { toggleFavorite } from '@/store/features/favorites/favoritesSlice';
import { useEffect, useState, type MouseEvent } from 'react';
import { fetchProductById } from '@/services/api';
import type { Product } from '@/types/product';
import ProductPageSkeleton from './ProductPageSkeleton';
import ProductError from './ProductError';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const productID = Number(id);
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = favorites.includes(productID);

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchProductById(productID);
        setProduct(response);
      } catch (error) {
        console.error(error);
        setError('Не удалось загрузить товар. Попробуйте позже');
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [productID]);

  if (isLoading) {
    return (
      <section className={styles.page}>
        <ProductPageSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.page}>
        <ProductError message={error} />
      </section>
    );
  }

  if (!product) {
    return (
      <section className={styles.page}>
        <ProductNotFound />
      </section>
    );
  }

  const discountPrice =
    product.discount != null
      ? Math.round(product.price * (1 - product.discount))
      : null;

  const handleFavoriteClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(toggleFavorite(productID));
  };

  return (
    <section className={styles.page}>
      <Link to="/" className={styles.backLink}>
        <ArrowLeft size={20} />
        Назад к каталогу
      </Link>

      <article className={styles.product}>
        <div className={styles.gallery}>
          <img
            src={product.images[0]}
            alt={product.title}
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.badges}>
            {product.isNew && <span className={styles.badgeNew}>Новинка</span>}
            {product.discount != null && (
              <span className={styles.badgeDiscount}>
                −{Math.round(product.discount * 100)}%
              </span>
            )}
          </div>

          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.categoryRating}>
            <div className={styles.rating}>
              <Star size={18} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
            <p>
              {product.category} • {product.brand}
            </p>
          </div>

          <div className={styles.priceFavorite}>
            <div className={styles.priceBlock}>
              {discountPrice != null && (
                <span className={styles.priceDiscount}>
                  {discountPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
              <span
                className={`${styles.price} ${discountPrice ? styles.priceOld : ''}`}
              >
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <button
              onClick={handleFavoriteClick}
              className={styles.favoriteButton}
            >
              <Heart
                size={27}
                fill={isFavorite ? '#ef4444' : 'none'}
                color={isFavorite ? '#ef4444' : 'currentColor'}
              />
            </button>
          </div>

          <div className={styles.stock}>
            {product.inStock ? (
              <span className={styles.inStock}>В наличии</span>
            ) : (
              <span className={styles.outOfStock}>Нет в наличии</span>
            )}
          </div>

          <button
            className={styles.cartButton}
            disabled={!product.inStock}
            type="button"
          >
            {product.inStock ? 'В корзину' : 'Недоступен'}
          </button>

          <div className={styles.description}>
            <h3>Описание</h3>
            <p>{product.description}</p>
          </div>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className={styles.specs}>
              <h3>Характеристики</h3>
              <dl className={styles.specsList}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className={styles.specRow}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </article>
    </section>
  );
};

export default ProductPage;
