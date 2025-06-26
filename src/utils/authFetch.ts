import { useAuthStore } from '../stores/useAuthStore';

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = useAuthStore.getState().token;
  const headers = new Headers(init.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  try {
    const res = await fetch(input, { ...init, headers });
    if (res.status === 401 || res.status === 403) {
      useAuthStore.getState().logout();
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API Error ${res.status}: ${text}`);
    }
    return res;
  } catch (err) {
    console.error('authFetch failed:', err);
    throw err;
  }
}
