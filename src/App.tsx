import React from 'react';
import { TalescribeProvider } from './contexts/TalescribeContext';
import TalescribeApp from './components/TalescribeApp';
import AudioPlayer from './components/AudioPlayer';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

function App() {
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
