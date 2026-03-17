import { ROUTES } from '@/routes/constants/routes';

export const footerSections = [
  {
    id: 'main',
    links: [
      { to: ROUTES.HOME, label: 'Главная' },
      { to: ROUTES.FAVORITES, label: 'Избранное' },
      { to: ROUTES.CART, label: 'Корзина' },
      { to: ROUTES.PROFILE, label: 'Личный кабинет' },
    ],
  },
  {
    id: 'company',
    links: [
      { to: '/about', label: 'О нас' },
      { to: '/contacts', label: 'Контакты' },
      { to: '/vacancies', label: 'Вакансии' },
      { to: '/agreements', label: 'Соглашения' },
    ],
  },
  {
    id: 'support',
    links: [
      { to: '/delivery', label: 'Доставка' },
      { to: '/returns', label: 'Возврат товаров' },
      { to: '/quality-check', label: 'Проверка качества' },
      { to: '/warranty', label: 'Гарантии' },
    ],
  },
];
