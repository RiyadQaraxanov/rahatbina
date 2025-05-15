
import { create } from 'zustand';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';
export type NotificationType = 'system' | 'parking' | 'device' | 'user' | 'support';

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  targetUsers?: string[]; // User IDs
  targetRoles?: string[]; // Role IDs
  createdAt: Date;
};

export type NotificationTemplate = {
  id: string;
  name: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
};

type NotificationStore = {
  notifications: Notification[];
  templates: NotificationTemplate[];
  unreadCount: number;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  fetchTemplates: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  sendNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => Promise<void>;
  createTemplate: (template: Omit<NotificationTemplate, 'id'>) => Promise<void>;
  updateTemplate: (id: string, data: Partial<Omit<NotificationTemplate, 'id'>>) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  templates: [],
  unreadCount: 0,
  isLoading: false,
  fetchNotifications: async () => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      const notifications = [
        {
          id: '1',
          title: 'System Maintenance',
          message: 'The system will undergo maintenance on Sunday at 3 AM.',
          type: 'system' as NotificationType,
          priority: 'medium' as NotificationPriority,
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
        {
          id: '2',
          title: 'Device Offline',
          message: 'Device ID: DEV-003 has gone offline unexpectedly.',
          type: 'device' as NotificationType,
          priority: 'high' as NotificationPriority,
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
        },
        {
          id: '3',
          title: 'New Support Request',
          message: 'A new support request has been submitted: "Gate sensor malfunction"',
          type: 'support' as NotificationType,
          priority: 'high' as NotificationPriority,
          isRead: false,
          targetRoles: ['1', '2', '3'],
          createdAt: new Date(Date.now() - 1000 * 60 * 30),
        },
      ];
      
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      
      set({
        notifications,
        unreadCount,
        isLoading: false,
      });
    }, 500);
  },
  fetchTemplates: async () => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set({
        templates: [
          {
            id: '1',
            name: 'System Maintenance Alert',
            title: 'System Maintenance',
            message: 'The system will undergo maintenance on {date} at {time}.',
            type: 'system',
            priority: 'medium',
          },
          {
            id: '2',
            name: 'Device Offline Alert',
            title: 'Device Offline',
            message: 'Device ID: {deviceId} has gone offline unexpectedly.',
            type: 'device',
            priority: 'high',
          },
          {
            id: '3',
            name: 'New Support Request',
            title: 'New Support Request',
            message: 'A new support request has been submitted: "{requestTitle}"',
            type: 'support',
            priority: 'high',
          },
        ],
        isLoading: false,
      });
    }, 500);
  },
  markAsRead: async (id) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set((state) => {
        const updatedNotifications = state.notifications.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        );
        
        const unreadCount = updatedNotifications.filter((n) => !n.isRead).length;
        
        return {
          notifications: updatedNotifications,
          unreadCount,
          isLoading: false,
        };
      });
    }, 300);
  },
  markAllAsRead: async () => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
        unreadCount: 0,
        isLoading: false,
      }));
    }, 500);
  },
  sendNotification: async (notification) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        isRead: false,
        createdAt: new Date(),
      };
      
      set((state) => ({
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
        isLoading: false,
      }));
    }, 500);
  },
  createTemplate: async (template) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      const newTemplate: NotificationTemplate = {
        ...template,
        id: Date.now().toString(),
      };
      
      set((state) => ({
        templates: [...state.templates, newTemplate],
        isLoading: false,
      }));
    }, 500);
  },
  updateTemplate: async (id, data) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set((state) => ({
        templates: state.templates.map((template) =>
          template.id === id
            ? { ...template, ...data }
            : template
        ),
        isLoading: false,
      }));
    }, 500);
  },
  deleteTemplate: async (id) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set((state) => ({
        templates: state.templates.filter((template) => template.id !== id),
        isLoading: false,
      }));
    }, 500);
  },
}));
