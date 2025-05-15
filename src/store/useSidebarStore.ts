// store/useSidebarStore.ts
import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  dark: boolean;
  toggleTheme: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  dark: true,
  toggleTheme: () => set((state) => ({ dark: !state.dark })),
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
