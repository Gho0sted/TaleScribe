import React from 'react';
import { TalescribeProvider } from './contexts/TalescribeContext';
import TalescribeApp from './components/TalescribeApp';
import AudioPlayer from './components/AudioPlayer';
import { BrowserRouter } from 'react-router-dom';
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
        <TalescribeProvider>
          <AudioPlayer />
          <TalescribeApp />
        </TalescribeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
