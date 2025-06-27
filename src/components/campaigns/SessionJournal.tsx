import React, { useState } from 'react';
import { useJournalStore } from '../../stores/journalStore';

const markdownToHtml = (md: string) => {
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/\n$/gim, '<br />');
};

const SessionJournal: React.FC<{ sessionId: string }> = ({ sessionId }) => {
  const { notes, setNote } = useJournalStore();
  const [edit, setEdit] = useState(false);
  const content = notes[sessionId] || '';

  const exportMd = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-${sessionId}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-4">
      {edit ? (
        <textarea
          value={content}
          onChange={(e) => setNote(sessionId, e.target.value)}
          className="w-full h-64 p-2 bg-gray-800 text-white rounded"
        />
      ) : (
        <div
          className="prose prose-invert"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
        />
      )}
      <div className="space-x-2">
        <button onClick={() => setEdit(!edit)} className="btn">
          {edit ? 'Preview' : 'Edit'}
        </button>
        <button onClick={exportMd} className="btn">
          Export MD
        </button>
      </div>
    </div>
  );
};

export default SessionJournal;
