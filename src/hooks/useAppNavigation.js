// Навигационные утилиты
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateTo = useCallback((r) => navigate(r), [navigate]);
  const getCurrentPage = useCallback(() => location.pathname, [location.pathname]);
  return { navigateTo, getCurrentPage };
};
