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
  setUser: (u: AuthUser) => void;
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
      setUser: (u) => set({ user: u }),
      logout: () => set({ user: undefined }),
    }),
    { name: 'auth-store' }
  )
);
