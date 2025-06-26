import { useCallback } from 'react';
import { sendNotification } from '../api/notifications';

export const useNotifications = () => {
  return useCallback(sendNotification, []);
};
