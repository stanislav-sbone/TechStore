import { useAppSelector } from '@/store/hooks';
import { Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from './constants/routes';

const PublicRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  const from = location.state?.from?.pathname || ROUTES.HOME;

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
