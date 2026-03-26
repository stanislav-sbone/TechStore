import { eq } from 'drizzle-orm';
import { db } from '../db/connection';
import { products } from '../db/schema/products';

export const getAllProducts = async () => {
  return await db
    .select({
      id: products.id,
      title: products.title,
      brand: products.brand,
      description: products.description,
      price: products.price,
      category: products.category,
      images: products.images,
      rating: products.rating,
      inStock: products.in_stock,
      isNew: products.is_new,
      discount: products.discount,
      specs: products.specs,
    })
    .from(products);
};

export const getProduct = async (id: number) => {
  const product = await db
    .select({
      id: products.id,
      title: products.title,
      brand: products.brand,
      description: products.description,
      price: products.price,
      category: products.category,
      images: products.images,
      rating: products.rating,
      inStock: products.in_stock,
      isNew: products.is_new,
      discount: products.discount,
      specs: products.specs,
    })
    .from(products)
    .where(eq(products.id, id));

  return product[0] ?? null;
};
