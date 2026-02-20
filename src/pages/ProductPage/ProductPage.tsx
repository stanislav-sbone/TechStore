import { Link, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  ProductBadges,
  ProductCategoryBrand,
  ProductError,
  ProductNotFound,
  ProductPageSkeleton,
  ProductPrice,
  ProductSpecs,
} from './components';
import { useEffect, useState } from 'react';
import { fetchProductById } from '@/services/api';
import type { Product } from '@/types/product';
import { ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { addToCart } from '@/store/features/cart/cartSlice';
import { toast } from 'react-toastify';
import useIsMobile from '@/hooks/useIsMobile';
import { QuantityControl } from '@/components/QuantityControl';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const productID = Number(id);
  const favorites = useAppSelector((state) => state.favorites.items);
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile(600);

  const isFavorite = favorites.includes(productID);
  const cartItem = cart.find((product) => product.productId === productID);

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

  useDocumentTitle(product ? product.title : '');

  const handleCartClick = () => {
    dispatch(addToCart(productID));
    if (!isMobile) toast.success('Товар добавлен в корзину');
  };

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
                {product.inStock ? 'В корзину' : 'Недоступен'}
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
