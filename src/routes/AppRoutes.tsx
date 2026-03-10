import { Routes, Route } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { Favorites } from '@/pages/Favorites';
import { ProductPage } from '@/pages/ProductPage';
import { Cart } from '@/pages/Cart';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />}></Route>
      <Route path={ROUTES.FAVORITES} element={<Favorites />}></Route>
      <Route path={ROUTES.PRODUCT} element={<ProductPage />}></Route>
      <Route path={ROUTES.CART} element={<Cart />}></Route>
      <Route path={ROUTES.LOGIN} element={<Login />}></Route>
      <Route path={ROUTES.REGISTER} element={<Register />}></Route>
      {/* <Route path={ROUTES.PROFILE} element={<Profile />}></Route> */}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppRoutes;
