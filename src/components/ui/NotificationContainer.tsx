/**
 * Wrapper for toast/notification elements
 * Обертка для уведомлений и всплывающих сообщений
 */
import React from 'react';

export const NotificationContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="notifications">{children}</div>
);
