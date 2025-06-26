// Web Notifications API helpers
export const requestPermission = async () => {
  if (!('Notification' in window)) return false;
  const res = await Notification.requestPermission();
  return res === 'granted';
};

export const sendNotification = (title: string, options?: NotificationOptions) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  }
};
