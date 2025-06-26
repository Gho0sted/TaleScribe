export const requestPermission = async () => {
  if (!('Notification' in window)) return false;
  const perm = await Notification.requestPermission();
  return perm === 'granted';
};

export const subscribePush = async () => {
  if (!('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.ready;
  try {
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([]),
    });
    await reg.active?.postMessage({ type: 'save-subscription', data: sub });
  } catch (e) {
    console.error(e);
  }
};

export const scheduleNotification = async (
  date: Date,
  title: string,
  body: string
) => {
  if (!('Notification' in window)) return;
  const delay = date.getTime() - Date.now();
  if (delay <= 0) {
    new Notification(title, { body });
  } else {
    setTimeout(() => new Notification(title, { body }), delay);
  }
};
