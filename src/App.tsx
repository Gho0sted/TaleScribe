import React from 'react';
import { TalescribeProvider } from './contexts/TalescribeContext';
import TalescribeApp from './components/TalescribeApp';
import AudioPlayer from './components/AudioPlayer';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import ForbiddenPage from './components/pages/ForbiddenPage';
import { useAuthStore } from './stores/useAuthStore';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { useApplyTheme } from './hooks/useApplyTheme';
import { usePluginLoader } from './hooks/usePluginLoader';
import { usePWA } from './hooks/usePWA';

function RequireAdmin({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);
  if (!user || user.role !== 'admin') {
    return <Navigate to="/403" replace />;
  }
  return children;
}

function App() {
  useApplyTheme();
  usePluginLoader();
  usePWA();
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <RequireAdmin>
                <TalescribeProvider>
                  <AdminDashboard />
                </TalescribeProvider>
              </RequireAdmin>
            }
          />
          <Route path="/403" element={<ForbiddenPage />} />
          <Route
            path="/*"
            element={
              <TalescribeProvider>
                <AudioPlayer />
                <TalescribeApp />
              </TalescribeProvider>
            }
          />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
