import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import { useChat } from '../../stores/useChatStore';

const MasterConsole: React.FC = () => {
  const { messages, addMessage, clearChat, exportTranscript } = useChat();
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('GM');
  const [role, setRole] = useState<'NPC' | 'Player'>('NPC');

  const handleSend = () => {
    if (!text.trim()) return;
    addMessage(author, role, text.trim());
    setText('');
  };

  const handleExport = (format: 'json' | 'markdown') => {
    const data = exportTranscript(format);
    const blob = new Blob([data], {
      type: format === 'json' ? 'application/json' : 'text/markdown',
    });
    const url = URL.createObjectURL(blob);
    const ext = format === 'json' ? 'json' : 'md';
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="max-h-80 overflow-y-auto border border-gray-700 p-2 rounded">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
      </div>
      <div className="space-y-2">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="input w-full"
          placeholder="Author"
        />
        <select
          className="input w-full"
          value={role}
          onChange={(e) => setRole(e.target.value as 'NPC' | 'Player')}
        >
          <option value="NPC">NPC</option>
          <option value="Player">Player</option>
        </select>
        <textarea
          className="input w-full h-24"
          placeholder="Enter message (Markdown supported)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="space-x-2">
          <button className="btn-primary" onClick={handleSend}>
            Send
          </button>
          <button className="btn" onClick={() => handleExport('markdown')}>
            Save MD
          </button>
          <button className="btn" onClick={() => handleExport('json')}>
            Save JSON
          </button>
          <button className="btn" onClick={clearChat}>
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterConsole;
