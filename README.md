## TechStore

Учебный проект интернет-магазина электроники: фронтенд на React (SPA) и бэкенд на Express + PostgreSQL (Drizzle ORM).

## Фичи

1. Каталог товаров
   - Загрузка списка товаров с сервера.
   - Поиск по названию.
   - Фильтрация по категориям.
   - Карточки товаров с кнопкой “В корзину” и переключателем “Избранное”.
2. Страница товара
   - Галерея изображений, описание, характеристики.
   - Отображение “В наличии / Нет в наличии”.
   - Учёт скидки (старая цена + цена со скидкой).
   - Действия: добавить в корзину / изменить количество (если товар уже в корзине) и добавить/убрать из избранного.
3. Избранное
   - Сохранение избранных товаров в профиле пользователя.
   - Фильтр по категориям среди избранного.
   - Поиск по избранному.
4. Корзина
   - Добавление товара в корзину.
   - Изменение количества и удаление товара.
   - Расчёт итоговой суммы и скидки.
   - Очистка корзины с модальным подтверждением.
5. Аутентификация и профиль
   - Регистрация и вход по `email + password`.
   - JWT токен в `localStorage` (`auth_token`).
   - Роут-гейтинг:
     - `PublicRoute`: не пускает в `login/register` пользователя, если он уже аутентифицирован (и ведёт на complete-profile при необходимости).
     - `CompleteProfileRoute`: защищает страницу заполнения данных и редиректит, если профиль уже заполнен.
     - `ProtectedRoute`: защищает `favorites/cart/profile`.
   - Заполнение профиля (complete profile): имя/фамилия/телефон/адрес.
   - Редактирование профиля: открывается модалкой из страницы `profile`.
   - История заказов (сначала недавние) с товарами, общей стоимостью и датой заказа.

## Стек

### Клиент

- `typescript`
- `react` + `react-router`
- `reduxjs/toolkit` (хранилище: products/favorites/cart/auth)
- `axios` (HTTP-клиент)
- `@chakra-ui/react` (карусель изображений)
- `react-hook-form` + `zod` (валидация форм)
- `react-toastify` (уведомления)
- `react-content-loader` (skeleton-загрузчики)
- `lucide-react` (иконки)
- сборка: `vite`, стили: `CSS Modules`

### Сервер

- `typescript`
- `express`
- `drizzle-orm` + `pg` (PostgreSQL)
- `jsonwebtoken` (access token)
- `bcrypt` (хэширование паролей)
- `cors`, `dotenv`

### Инструменты разработки

- `eslint`, `prettier`, `typescript`
- `husky` + `lint-staged` (lint/format по staged-файлам)
- `drizzle-kit` (generate/migrate) и `ts-node-dev` (dev-сервер бэкенда)

## API (REST)

Базовый URL: `http://localhost:3000/api`

### Продукты

- `GET /api/products/`
  - Возвращает массив товаров.
- `GET /api/products/:productId`
  - Возвращает товар по id (или `404`).

### Auth

- `POST /api/auth/register`
  - Body: `{ email, password }`
  - Response: `{ message, token, user: { userId, email } }`
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Response: `{ message, token, user: { userId, email } }`
- `GET /api/auth/me`
  - Authorization: `Bearer <token>`
  - Response: `{ user: { userId, email } }`

### Пользователь / Профиль

- `GET /api/users/me`
  - Authorization: `Bearer <token>`
  - Response: `{ user: { userId, email, firstName, lastName, phone, address, isProfileCompleted } }`
- `PATCH /api/users/me`
  - Authorization: `Bearer <token>`
  - Body: `{ firstName, lastName, phone, address, email }`
  - Response: `{ message, user }`

### Избранное

- `GET /api/users/me/favorites`
  - Authorization: `Bearer <token>`
  - Response: `{ items: number[] }`
- `PUT /api/users/me/favorites`
  - Authorization: `Bearer <token>`
  - Body: `{ items: number[] }`
  - Response: `{ items: number[] }`

### Корзина

- `GET /api/users/me/cart`
  - Authorization: `Bearer <token>`
  - Response: `{ items: CartItem[] }`, где `CartItem = { productId, quantity }`
- `PUT /api/users/me/cart`
  - Authorization: `Bearer <token>`
  - Body: `{ items: CartItem[] }`
  - Response: `{ items: CartItem[] }`

### История заказов

- `POST /api/users/me/orders`
  - Authorization: `Bearer <token>`
  - Response: `{ orderId, userId, items, totalAmount, created_at }`, где `items = { productId, title, image, quantity, price }`
- `GET /api/users/me/orders`
  - Authorization: `Bearer <token>`
  - Response: `userOrders[]`

## Данные (модель БД)

Построено на Drizzle ORM:

- `users`
  - `email` (unique), `password_hash`, `first_name`, `last_name`, `phone`, `address`, `is_profile_completed`
- `products`
  - `title`, `brand`, `description`, `price`, `category` (enum), `images` (text[]), `rating`, `in_stock`, `is_new`, `discount`, `specs` (jsonb)
- `users_favorites`
  - `items` (integer[]), хранит id избранных товаров
- `users_cart`
  - `items` (jsonb array), хранит `[{ productId, quantity }]`
- `orders`
  - `orderNumber`, `user_id`, `items`, `totalAmount`, `created_at`

## Переменные окружения

### Клиент (.env в корне)

- `VITE_API_URL` — базовый URL API

### Сервер (нужны переменные в окружении при запуске)

- `DATABASE_URL` — строка подключения к PostgreSQL
- `JWT_SECRET` — секрет для подписи JWT
- `SALT_ROUNDS` — число (параметр для bcrypt)
- `PORT` — порт сервера

## Запуск

1. Поднять сервер
   - `cd server`
   - `pnpm install`
   - `pnpm run dev`
2. Поднять фронтенд
   - В корне проекта:
     - `pnpm install`
     - `pnpm run dev`
3. Открыть фронтенд в браузере
   - `http://localhost:5173`
