import { create } from 'zustand'
import { type IMenuItemConfig, type TMenuConfig } from '@/components/menu'

interface MenusState {
  configs: Map<string, TMenuConfig | null>
  currentMenuItem: IMenuItemConfig | null

  setMenuConfig: (name: string, config: TMenuConfig | null) => void
  getMenuConfig: (name: string) => TMenuConfig | null

  setCurrentMenuItem: (item: IMenuItemConfig | null) => void
  getCurrentMenuItem: () => IMenuItemConfig | null
}

export const useMenus = create<MenusState>((set, get) => ({
  configs: new Map(),
  currentMenuItem: null,

  setMenuConfig: (name, config) => {
    const newConfigs = new Map(get().configs)
    newConfigs.set(name, config)
    set({ configs: newConfigs })
  },

  getMenuConfig: (name) => {
    return get().configs.get(name) ?? null
  },

  setCurrentMenuItem: (item) => {
    set({ currentMenuItem: item })
  },

  getCurrentMenuItem: () => {
    return get().currentMenuItem
  }
}))
