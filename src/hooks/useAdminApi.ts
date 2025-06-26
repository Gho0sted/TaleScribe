export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}

import { authFetch } from '../utils/authFetch';

export const useAdminApi = () => {
  const callApi = async <T>(path: string, options: ApiOptions = {}): Promise<T> => {
    const res = await authFetch(`/api/admin${path}`, {
      method: options.method || 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  };

  return {
    get: <T>(p: string) => callApi<T>(p),
    post: <T>(p: string, b: any) => callApi<T>(p, { method: 'POST', body: b }),
    put: <T>(p: string, b: any) => callApi<T>(p, { method: 'PUT', body: b }),
    del: <T>(p: string) => callApi<T>(p, { method: 'DELETE' }),
  };
};
