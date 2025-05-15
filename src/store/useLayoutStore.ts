import { create } from 'zustand'
import { deepMerge } from '@/lib/utils/Data' // sadece merge yardımcı fonksiyon, istersen kendi yazılır

// Layout ayarı
export interface ILayoutConfig {
  name: string
  options: {
    sidebar: {
      collapse: boolean
      theme: string
    }
  }
}

// Varsayılan layout (örnek)
const defaultLayoutConfig: ILayoutConfig = {
  name: 'demo1',
  options: {
    sidebar: {
      collapse: false,
      theme: 'light'
    }
  }
}

interface Demo1LayoutState {
  layout: ILayoutConfig
  megaMenuEnabled: boolean
  headerSticky: boolean
  mobileSidebarOpen: boolean
  mobileMegaMenuOpen: boolean
  sidebarMouseLeave: boolean

  setSidebarMouseLeave: (state: boolean) => void
  setMobileSidebarOpen: (open: boolean) => void
  setMobileMegaMenuOpen: (open: boolean) => void
  setMegaMenuEnabled: (enabled: boolean) => void
  setSidebarCollapse: (collapse: boolean) => void
  setSidebarTheme: (mode: string) => void
  setHeaderSticky: (sticky: boolean) => void
  resetLayout: () => void
}

export const useDemo1Layout = create<Demo1LayoutState>((set, get) => ({
  layout: defaultLayoutConfig,
  megaMenuEnabled: false,
  headerSticky: false,
  mobileSidebarOpen: false,
  mobileMegaMenuOpen: false,
  sidebarMouseLeave: false,

  setSidebarMouseLeave: (state) => set({ sidebarMouseLeave: state }),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  setMobileMegaMenuOpen: (open) => set({ mobileMegaMenuOpen: open }),
  setMegaMenuEnabled: (enabled) => set({ megaMenuEnabled: enabled }),
  setHeaderSticky: (sticky) => set({ headerSticky: sticky }),

  setSidebarCollapse: (collapse) => {
    const current = get().layout
    const updated = deepMerge(current, {
      options: { sidebar: { collapse } }
    })
    set({ layout: updated })
  },

  setSidebarTheme: (theme) => {
    const current = get().layout
    const updated = deepMerge(current, {
      options: { sidebar: { theme } }
    })
    set({ layout: updated })
  },

  resetLayout: () => set({ layout: defaultLayoutConfig })
}))
