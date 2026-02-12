import type { ProductCategory } from '@/types/product';

export default interface Categories {
  title: string;
  value: 'all' | ProductCategory;
}

export const CATEGORIES: Categories[] = [
  {
    title: 'Все',
    value: 'all',
  },
  {
    title: 'Смартфоны',
    value: 'Смартфоны',
  },
  {
    title: 'Ноутбуки',
    value: 'Ноутбуки',
  },
  {
    title: 'Комплектующие для ПК',
    value: 'Комплектующие для ПК',
  },
  {
    title: 'Бытовые приборы',
    value: 'Бытовые приборы',
  },
  {
    title: 'Смарт-часы',
    value: 'Смарт-часы',
  },
];
