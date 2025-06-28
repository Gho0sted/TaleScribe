import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './AdminLayout';
const UsersPage = React.lazy(() => import('./pages/UsersPage'));
const CampaignsPage = React.lazy(() => import('./pages/CampaignsPage'));
const SessionsPage = React.lazy(() => import('./pages/SessionsPage'));
const LogsPage = React.lazy(() => import('./pages/LogsPage'));
const FlagsPage = React.lazy(() => import('./pages/FlagsPage'));
const TranslationsPage = React.lazy(() => import('./pages/TranslationsPage'));
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const AdminDashboard: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading admin..." />}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="logs" element={<LogsPage />} />
          <Route path="flags" element={<FlagsPage />} />
          <Route path="translations" element={<TranslationsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminDashboard;
