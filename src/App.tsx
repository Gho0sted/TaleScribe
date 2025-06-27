import React from 'react';
import { TalescribeProvider } from './contexts/TalescribeContext';
import TalescribeApp from './components/TalescribeApp';
import AudioPlayer from './components/AudioPlayer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const AdminDashboard = React.lazy(() => import('./admin/AdminDashboard'));
import ForbiddenPage from './components/pages/ForbiddenPage';
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
        <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <TalescribeProvider>
                  <AdminDashboard />
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
        </React.Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
