export type ProductCategory =
  | 'Смартфоны'
  | 'Ноутбуки'
  | 'Комплектующие для ПК'
  | 'Бытовые приборы'
  | 'Смарт-часы';

export interface Product {
  id: number;
  title: string;
  brand: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  rating: number;
  inStock: boolean;
  isNew: boolean;
  discount?: number;
  specs?: Record<string, string>;
}
