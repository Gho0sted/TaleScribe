import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '../stores/useAuthStore';

interface Props {
  role?: UserRole;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ role = 'user', children }) => {
  const { user, token } = useAuthStore((s) => ({ user: s.user, token: s.token }));
  if (!user || !token) {
    return <Navigate to="/403" replace />;
  }
  if (role === 'admin' && user.role !== 'admin') {
    return <Navigate to="/403" replace />;
  }
  return children;
};

export default ProtectedRoute;
