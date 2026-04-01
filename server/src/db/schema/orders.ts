import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export type OrderItem = {
  productId: number;
  quantity: number;
  price: number;
};

export const orders = pgTable(
  'orders',
  {
    id: serial('id').primaryKey(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    items: jsonb('items').$type<OrderItem[]>().notNull(),
    amount: integer('amount').notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('orders_user_id_created_at_idx').on(
      table.user_id,
      table.created_at.desc()
    ),
  ]
);
