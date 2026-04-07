import z from 'zod';

export const editProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'Заполните имя')
    .max(30, 'Слишком длинное имя'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Заполните фамилию')
    .max(30, 'Слишком длинная фамилия'),
  phone: z
    .string()
    .trim()
    .min(1, 'Заполните номер телефона')
    .regex(/^(?:\+7|8|7)\d{10}$/, 'Введите корректный номер телефона'),
  address: z.string().trim().min(5, 'Заполните адрес доставки'),
  email: z
    .email('Введите корректный email')
    .trim()
    .min(1, 'Заполните email')
    .max(255, 'Слишком длинный email'),
});

export type EditProfileData = z.infer<typeof editProfileSchema>;
