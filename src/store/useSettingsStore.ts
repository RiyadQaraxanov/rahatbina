
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'tr' | 'en' | 'de' | 'fr' | 'ar';

export type SystemSettings = {
  theme: ThemeMode;
  language: Language;
  notificationsEnabled: boolean;
  mapApiKey?: string;
  firebaseConfig?: Record<string, string>;
  smtpConfig?: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
  };
  appVersion: string;
  lastUpdated: Date;
};

type SettingsStore = {
  settings: SystemSettings;
  updateSettings: (settings: Partial<SystemSettings>) => void;
  resetSettings: () => void;
};

const defaultSettings: SystemSettings = {
  theme: 'system',
  language: 'tr',
  notificationsEnabled: true,
  appVersion: '1.0.0',
  lastUpdated: new Date(),
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
            lastUpdated: new Date(),
          },
        }));
      },
      resetSettings: () => {
        set({ settings: defaultSettings });
      },
    }),
    {
      name: 'park-pilot-settings',
    }
  )
);
