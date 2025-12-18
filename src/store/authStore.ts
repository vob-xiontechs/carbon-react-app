import { create } from 'zustand';

type User = { username: string; password: string };

const mockUsers: User[] = [
  { username: 'test@example.com', password: 'password123' },
  { username: 'demo', password: 'demo' },
];

export const useAuthStore = create<{
  loggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  user?: string;
}>((set) => ({
  loggedIn: false,
  user: undefined,
  login: (username: string, password: string) => {
    const ok = mockUsers.some(u => u.username === username && u.password === password);
    if (ok) set({ loggedIn: true, user: username });
    return ok;
  },
  logout: () => set({ loggedIn: false, user: undefined }),
}));
