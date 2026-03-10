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
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.FAVORITES} element={<Favorites />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        {/* <Route path={ROUTES.PROFILE} element={<Profile />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
