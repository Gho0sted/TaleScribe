import { create } from 'zustand';

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  status: 'active' | 'blocked';
}

interface UsersState {
  users: AdminUser[];
  updateUser: (id: string, updates: Partial<AdminUser>) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [
    { id: '1', email: 'admin@example.com', role: 'admin', status: 'active' },
    { id: '2', email: 'user@example.com', role: 'user', status: 'active' },
  ],
  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    })),
}));
