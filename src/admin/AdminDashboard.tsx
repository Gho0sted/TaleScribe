import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import UsersPage from './pages/UsersPage';
import CampaignsPage from './pages/CampaignsPage';
import SessionsPage from './pages/SessionsPage';
import LogsPage from './pages/LogsPage';
import FlagsPage from './pages/FlagsPage';
import TranslationsPage from './pages/TranslationsPage';

const AdminDashboard: React.FC = () => {
  return (
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
  );
};

export default AdminDashboard;
