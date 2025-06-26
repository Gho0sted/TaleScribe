import React from 'react';
import { TalescribeProvider } from './contexts/TalescribeContext';
import TalescribeApp from './components/TalescribeApp';

function App() {
  return (
    <div className="App">
      <TalescribeProvider>
        <TalescribeApp />
      </TalescribeProvider>
    </div>
  );
}

export default App;
