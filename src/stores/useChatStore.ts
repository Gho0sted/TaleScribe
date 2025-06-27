import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ChatRole = 'NPC' | 'Player';

export interface ChatEntry {
  id: string;
  author: string;
  role: ChatRole;
  text: string;
  timestamp: number;
}

interface ChatState {
  messages: ChatEntry[];
  addMessage: (author: string, role: ChatRole, text: string) => void;
  clearChat: () => void;
  exportTranscript: (format: 'json' | 'markdown') => string;
}

export const useChatStore = create<ChatState>(
  persist(
    (set, get) => ({
      messages: [],
      addMessage: (author, role, text) => {
        const entry: ChatEntry = {
          id: Date.now().toString(),
          author,
          role,
          text,
          timestamp: Date.now(),
        };
        set((state) => ({
          messages: [...state.messages, entry].slice(-50),
        }));
      },
      clearChat: () => set({ messages: [] }),
      exportTranscript: (format) => {
        const msgs = get().messages;
        if (format === 'json') {
          return JSON.stringify(msgs, null, 2);
        }
        return msgs
          .map(
            (m) =>
              `[${new Date(m.timestamp).toLocaleString()}] **${m.author}**: ${m.text}`,
          )
          .join('\n');
      },
    }),
    { name: 'chat-store' },
  ),
);

export const useChat = () =>
  useChatStore((state) => ({
    messages: state.messages,
    addMessage: state.addMessage,
    clearChat: state.clearChat,
    exportTranscript: state.exportTranscript,
  }));
