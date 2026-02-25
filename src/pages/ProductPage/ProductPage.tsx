import { Link } from 'react-router';
import {
  Gallery,
  ProductBadges,
  ProductCategoryBrand,
  ProductError,
  ProductNotFound,
  ProductPageSkeleton,
  ProductPrice,
  ProductSpecs,
} from './components';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { QuantityControl } from '@/components/QuantityControl';
import { useProductPage } from '@/hooks/useProductPage';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const {
    product,
    productID,
    isLoading,
    error,
    isFavorite,
    cartItem,
    discountPrice,
    handleCartClick,
  } = useProductPage();

  useDocumentTitle(product ? product.title : '');

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

  return (
    <section className={styles.page}>
      <Link to="/" className={styles.backLink}>
        <ArrowLeft size={20} />
        Назад к каталогу
      </Link>

      <article className={styles.product}>
        <Gallery product={product} />

        <div className={styles.info}>
          <ProductBadges isNew={product.isNew} discount={product.discount} />

          <h1 className={styles.title}>{product.title}</h1>

          <ProductCategoryBrand
            rating={product.rating}
            category={product.category}
            brand={product.brand}
          />

          <ProductPrice
            productID={productID}
            discountPrice={discountPrice}
            price={product.price}
            isFavorite={isFavorite}
          />

          <div className={styles.stock}>
            {product.inStock ? (
              <span className={styles.inStock}>В наличии</span>
            ) : (
              <span className={styles.outOfStock}>Нет в наличии</span>
            )}
          </div>

          <div className={styles.actions}>
            {cartItem ? (
              <QuantityControl productId={productID} cartItem={cartItem} />
            ) : (
              <button
                className={styles.cartButton}
                disabled={!product.inStock}
                onClick={handleCartClick}
              >
                {product.inStock ? (
                  <>
                    <ShoppingCart size={20} strokeWidth={3} /> В корзину
                  </>
                ) : (
                  'Недоступен'
                )}
              </button>
            )}
          </div>

          <div className={styles.description}>
            <h3>Описание</h3>
            <p>{product.description}</p>
          </div>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <ProductSpecs specs={product.specs} />
          )}
        </div>
      </article>
    </section>
  );
};

export default ProductPage;
