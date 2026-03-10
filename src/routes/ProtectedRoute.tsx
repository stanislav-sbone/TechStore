import { Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from './constants/routes';
import { useAppSelector } from '@/store/hooks';

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
