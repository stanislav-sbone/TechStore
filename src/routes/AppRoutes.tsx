import { Routes, Route } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { Home } from '@/pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />}></Route>
      {/* <Route path={ROUTES.FAVORITES} element={<Favorites />}></Route> */}
      {/* <Route path={ROUTES.CART} element={<Cart />}></Route> */}
      {/* <Route path={ROUTES.PRODUCT} element={<Product />}></Route> */}
      {/* <Route path={ROUTES.PROFILE} element={<Profile />}></Route> */}
      {/* <Route path="*" element={<NotFound />}></Route> */}
    </Routes>
  );
};

export default AppRoutes;
