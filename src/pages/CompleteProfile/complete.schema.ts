import { z } from 'zod';

export const completeProfileSchema = z.object({
  firstName: z.string().trim().min(2, 'Заполните имя'),
  lastName: z.string().trim().min(2, 'Заполните фамилию'),
  phone: z
    .string()
    .trim()
    .min(1, 'Заполните номер телефона')
    .regex(/^\+7|8\d{10}$/, 'Введите корректный номер телефона'),
  address: z.string().trim().min(5, 'Заполните адрес доставки'),
});

export type CompleteProfileData = z.infer<typeof completeProfileSchema>;
