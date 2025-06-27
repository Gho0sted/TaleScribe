import create from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'user';
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  status: 'active' | 'blocked';
}

interface AuthState {
  user?: AuthUser;
  token?: string;
  setUser: (u: AuthUser) => void;
  setToken: (t: string | undefined) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: {
        id: '1',
        email: 'admin@example.com',
        role: 'admin',
        status: 'active',
      },
      token: undefined,
      setUser: (u) => set({ user: u }),
      setToken: (t) => set({ token: t }),
      logout: () => set({ user: undefined, token: undefined }),
    }),
    { name: 'auth-store' },
  ),
);
