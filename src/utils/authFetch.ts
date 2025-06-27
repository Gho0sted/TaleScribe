import { useAuthStore } from '../stores/useAuthStore';

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = useAuthStore.getState().token;
  const headers = new Headers(init.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  let attempt = 0;
  while (attempt < 2) {
    try {
      const res = await fetch(input, { ...init, headers });
      if (res.status === 401 && attempt === 0) {
        attempt++;
        useAuthStore.getState().logout();
        continue;
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API Error ${res.status}: ${text}`);
      }
      return res;
    } catch (err) {
      if (attempt === 1) {
        console.error('authFetch failed after retries:', err);
        throw err;
      }
      attempt++;
    }
  }
  throw new Error('authFetch failed');
}
