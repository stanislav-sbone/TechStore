import { useAppSelector } from '@/store/hooks';
import { Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from './constants/routes';

const CompleteProfileRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  const from = location.state?.from?.pathname || ROUTES.HOME;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={location.state} replace />;
  }

  if (!user) {
    return null;
  }

  if (user.isProfileCompleted) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default CompleteProfileRoute;
