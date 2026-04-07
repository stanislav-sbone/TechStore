import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z
      .email('Введите корректный email')
      .trim()
      .min(1, 'Заполните email')
      .max(255, 'Слишком длинный email'),
    password: z
      .string()
      .min(1, 'Введите пароль')
      .min(8, 'Пароль должен содержать минимум 8 символов'),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
    personalData: z.boolean().refine((value) => value === true, {
      message: 'Необходимо согласие на обработку персональных данных',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
