import { ROUTES } from '@/routes/constants/routes';
import { Heart, Home, ShoppingCart, User } from 'lucide-react';

export const navItems = [
  {
    path: ROUTES.HOME,
    icon: Home,
    label: 'Главная',
  },
  {
    path: ROUTES.FAVORITES,
    icon: Heart,
    label: 'Избранное',
  },
  {
    path: ROUTES.CART,
    icon: ShoppingCart,
    label: 'Корзина',
  },
  {
    path: ROUTES.PROFILE,
    icon: User,
    label: 'Профиль',
  },
] as const;
