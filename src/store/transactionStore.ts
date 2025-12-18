import { create } from 'zustand';

export type Allocation = {
  forWife: number;      // giành cho vợ
  transferToWife: number; // chuyển cho vợ
  keep: number;         // giữ lại
};

export type Transaction = {
  id: string;
  type: 'income' | 'expense';

  amount: number;

  allocation?: Allocation; // 🔥 CHỈ CÓ CHO INCOME

  source?: 'grab' | 'salary' | 'other';
  category?: 'fuel' | 'food' | 'living' | 'other';

  note?: string;
  date: string;
};


type State = {
  transactions: Transaction[];
  add: (t: Transaction) => void;
  update: (id: string, t: Partial<Transaction>) => void;
  remove: (id: string) => void;
  reset: () => void;
};

const STORAGE_KEY = 'transactions';

export const useTransactionStore = create<State>((set) => ({
  transactions: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),

  add: (t) =>
    set((s) => {
      const next = [...s.transactions, t];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { transactions: next };
    }),

  update: (id, data) =>
    set((s) => {
      const next = s.transactions.map((t) =>
        t.id === id ? { ...t, ...data } : t
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { transactions: next };
    }),

  remove: (id) =>
    set((s) => {
      const next = s.transactions.filter((t) => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { transactions: next };
    }),

  reset: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ transactions: [] });
  },
}));
