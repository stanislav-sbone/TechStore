export type GradeName =
  | 'Новый покупатель'
  | 'Начинающий покупатель'
  | 'Активный покупатель'
  | 'Постоянный клиент'
  | 'Преданный покупатель'
  | 'VIP клиент';

export interface CustomerGrade {
  name: GradeName;
  minOrders: number;
  maxOrders: number | null;
}

export const customerGrades: CustomerGrade[] = [
  {
    name: 'Новый покупатель',
    minOrders: 0,
    maxOrders: 0,
  },
  {
    name: 'Начинающий покупатель',
    minOrders: 1,
    maxOrders: 2,
  },
  {
    name: 'Активный покупатель',
    minOrders: 3,
    maxOrders: 5,
  },
  {
    name: 'Постоянный клиент',
    minOrders: 6,
    maxOrders: 10,
  },
  {
    name: 'Преданный покупатель',
    minOrders: 11,
    maxOrders: 20,
  },
  {
    name: 'VIP клиент',
    minOrders: 21,
    maxOrders: null,
  },
];
