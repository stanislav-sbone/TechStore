import { ROUTES } from '@/routes/constants/routes';
import { useAppSelector } from '@/store/hooks';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useRequireAuth = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const requireAuth = () => {
    if (isAuthenticated) {
      return true;
    }

    toast.info('Необходима авторизация');

    navigate(ROUTES.LOGIN, {
      state: { from: location },
    });

    return false;
  };

  return { requireAuth, isAuthenticated };
};
