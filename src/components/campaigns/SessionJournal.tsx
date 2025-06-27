import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { useJournalStore } from '../../stores/journalStore';
import { downloadFile } from '../../utils/downloadFile';


const SessionJournal: React.FC<{ sessionId: string }> = ({ sessionId }) => {
  const { notes, setNote } = useJournalStore();
  const [edit, setEdit] = useState(false);
  const content = notes[sessionId] || '';

  const exportMd = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    downloadFile(blob, `session-${sessionId}.md`);
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
        <div className="prose prose-invert">
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
        </div>
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
