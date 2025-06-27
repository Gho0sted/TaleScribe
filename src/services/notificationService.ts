export const requestPermission = async () => {
  if (!('Notification' in window)) return false;
  const perm = await Notification.requestPermission();
  return perm === 'granted';
};

export const scheduleNotification = async (
  date: Date,
  title: string,
  body: string,
) => {
  if (!('Notification' in window)) return;
  const delay = date.getTime() - Date.now();
  if (delay <= 0) {
    new Notification(title, { body });
  } else {
    setTimeout(() => new Notification(title, { body }), delay);
  }
};
