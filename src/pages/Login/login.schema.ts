import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Введите корректный email').trim().min(1, 'Заполните email'),
  password: z.string().min(1, 'Введите пароль'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
