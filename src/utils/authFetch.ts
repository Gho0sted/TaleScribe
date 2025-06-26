import { useAuthStore } from '../stores/useAuthStore';

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = useAuthStore.getState().token;
  const headers = new Headers(init.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const res = await fetch(input, { ...init, headers });
  if (res.status === 401 || res.status === 403) {
    useAuthStore.getState().logout();
  }
  return res;
}
