
import { create } from 'zustand';

type Stats = {
  totalUsers: number;
  activeParkingAreas: number;
  dailyNotifications: number;
  activeDevices: number;
  pendingIssues: number;
};

type ActivityLog = {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  timestamp: Date;
  details?: string;
};

type DashboardStore = {
  stats: Stats;
  recentActivities: ActivityLog[];
  isLoading: boolean;
  fetchStats: () => Promise<void>;
  fetchRecentActivities: () => Promise<void>;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: {
    totalUsers: 0,
    activeParkingAreas: 0,
    dailyNotifications: 0,
    activeDevices: 0,
    pendingIssues: 0,
  },
  recentActivities: [],
  isLoading: false,
  fetchStats: async () => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set({
        stats: {
          totalUsers: 154,
          activeParkingAreas: 23,
          dailyNotifications: 17,
          activeDevices: 42,
          pendingIssues: 5,
        },
        isLoading: false,
      });
    }, 500);
  },
  fetchRecentActivities: async () => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set({
        recentActivities: [
          {
            id: '1',
            userId: 'user1',
            userName: 'Ahmet Yılmaz',
            action: 'login',
            module: 'auth',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
          },
          {
            id: '2',
            userId: 'user2',
            userName: 'Mehmet Kaya',
            action: 'created',
            module: 'parking',
            timestamp: new Date(Date.now() - 1000 * 60 * 15),
            details: 'Created new parking area "Central Park"',
          },
          {
            id: '3',
            userId: 'user3',
            userName: 'Ayşe Demir',
            action: 'updated',
            module: 'device',
            timestamp: new Date(Date.now() - 1000 * 60 * 45),
            details: 'Updated device configuration for ID: DEV-2023-09',
          },
        ],
        isLoading: false,
      });
    }, 500);
  },
}));
