import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatEntry } from '../../stores/useChatStore';

interface Props {
  message: ChatEntry;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="p-2 rounded-md mb-2 bg-gray-700">
      <div className="text-xs text-gray-400 mb-1">
        {message.author} ({message.role}) –{' '}
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
