import { ROUTES } from '@/routes/constants/routes';
import {
  Heart,
  Home,
  ShoppingCart,
  User,
  type LucideProps,
} from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

interface NavItem {
  path: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  hasBadge: boolean;
}

export const navItems: NavItem[] = [
  {
    path: ROUTES.HOME,
    icon: Home,
    label: 'Главная',
    hasBadge: false,
  },
  {
    path: ROUTES.FAVORITES,
    icon: Heart,
    label: 'Избранное',
    hasBadge: true,
  },
  {
    path: ROUTES.CART,
    icon: ShoppingCart,
    label: 'Корзина',
    hasBadge: true,
  },
  {
    path: ROUTES.PROFILE,
    icon: User,
    label: 'Профиль',
    hasBadge: false,
  },
] as const;
