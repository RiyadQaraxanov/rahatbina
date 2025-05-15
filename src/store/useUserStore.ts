import { create } from 'zustand';
import type { User } from '@/types/User';


type UserStore = {
  user?: User;
  setUser: (user: User) => void;
  removeUser: () => void;
};

export const useUser = create<UserStore>()(( set ) => ({
  user: undefined,
  setUser: (userData) => set(() => ({
    user: userData
  })),
  removeUser: () =>
    set(() => ({
      user: undefined,
    })),
}));
