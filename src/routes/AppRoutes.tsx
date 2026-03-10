import { Routes, Route } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import {
  Cart,
  Favorites,
  Home,
  Login,
  NotFound,
  ProductPage,
  Register,
} from '@/pages';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.FAVORITES} element={<Favorites />} />
      <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
      <Route path={ROUTES.CART} element={<Cart />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      {/* <Route path={ROUTES.PROFILE} element={<Profile />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
