/**
 * Application entry component configuring providers and routing.
 * Главный компонент приложения, настраивающий провайдеры и маршрутизацию.
 */
import React, { Suspense } from 'react';
import { TalescribeProvider } from './contexts/TalescribeContext';
import TalescribeApp from './components/TalescribeApp';
import AudioPlayer from './components/AudioPlayer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
const AdminDashboard = React.lazy(() => import('./admin/AdminDashboard'));
import ForbiddenPage from './pages/ForbiddenPage';
import ProtectedRoute from './routes/ProtectedRoute';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { useApplyTheme } from './hooks/useApplyTheme';
import { usePluginLoader } from './hooks/usePluginLoader';
import { usePWA } from './hooks/usePWA';

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
              <ProtectedRoute role="admin">
                <TalescribeProvider>
                  <Suspense fallback={<LoadingSpinner message="Loading admin..." />}>
                    <AdminDashboard />
                  </Suspense>
                </TalescribeProvider>
              </ProtectedRoute>
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
