
import { create } from 'zustand';
import { Permission, PermissionMap } from './useAuthStore';

export type Role = {
  id: string;
  name: string;
  description: string;
  permissions: PermissionMap;
  createdAt: Date;
  updatedAt: Date;
};

// Define all system modules
export const systemModules = [
  'dashboard',
  'users',
  'roles',
  'parking',
  'devices',
  'notifications',
  'settings',
  'logs',
  'support',
  'language',
] as const;

export type SystemModule = typeof systemModules[number];

type RoleStore = {
  roles: Role[];
  availablePermissions: Permission[];
  isLoading: boolean;
  fetchRoles: () => Promise<void>;
  createRole: (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateRole: (id: string, data: Partial<Omit<Role, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  updateRolePermissions: (roleId: string, module: string, permissions: Permission[]) => Promise<void>;
};

export const useRoleStore = create<RoleStore>((set, get) => ({
  roles: [],
  availablePermissions: ['view', 'create', 'update', 'delete'],
  isLoading: false,
  fetchRoles: async () => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set({
        roles: [
          {
            id: '1',
            name: 'Super Admin',
            description: 'Has full access to all system features',
            permissions: {
              dashboard: ['view'],
              users: ['view', 'create', 'update', 'delete'],
              roles: ['view', 'create', 'update', 'delete'],
              parking: ['view', 'create', 'update', 'delete'],
              devices: ['view', 'create', 'update', 'delete'],
              notifications: ['view', 'create', 'update', 'delete'],
              settings: ['view', 'update'],
              logs: ['view'],
              support: ['view', 'create', 'update', 'delete'],
              language: ['view', 'create', 'update', 'delete'],
            },
            createdAt: new Date(2023, 0, 1),
            updatedAt: new Date(2023, 0, 1),
          },
          {
            id: '2',
            name: 'Admin',
            description: 'Has access to most system features',
            permissions: {
              dashboard: ['view'],
              users: ['view', 'create', 'update'],
              roles: ['view'],
              parking: ['view', 'create', 'update'],
              devices: ['view', 'update'],
              notifications: ['view', 'create'],
              settings: ['view'],
              logs: ['view'],
              support: ['view', 'create', 'update'],
              language: ['view'],
            },
            createdAt: new Date(2023, 0, 2),
            updatedAt: new Date(2023, 2, 15),
          },
          {
            id: '3',
            name: 'Operator',
            description: 'Can manage day-to-day operations',
            permissions: {
              dashboard: ['view'],
              users: ['view'],
              parking: ['view', 'update'],
              devices: ['view', 'update'],
              notifications: ['view', 'create'],
              logs: ['view'],
              support: ['view', 'create'],
            },
            createdAt: new Date(2023, 0, 3),
            updatedAt: new Date(2023, 3, 10),
          },
          {
            id: '4',
            name: 'Inspector',
            description: 'Can view and verify parking areas and devices',
            permissions: {
              dashboard: ['view'],
              parking: ['view'],
              devices: ['view'],
              logs: ['view'],
              support: ['create'],
            },
            createdAt: new Date(2023, 0, 4),
            updatedAt: new Date(2023, 0, 4),
          },
          {
            id: '5',
            name: 'User',
            description: 'Standard user with limited access',
            permissions: {
              parking: ['view'],
              support: ['create'],
            },
            createdAt: new Date(2023, 0, 5),
            updatedAt: new Date(2023, 0, 5),
          },
        ],
        isLoading: false,
      });
    }, 500);
  },
  createRole: async (role) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      const newRole: Role = {
        ...role,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      set((state) => ({
        roles: [...state.roles, newRole],
        isLoading: false,
      }));
    }, 500);
  },
  updateRole: async (id, data) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set((state) => ({
        roles: state.roles.map((role) =>
          role.id === id
            ? { ...role, ...data, updatedAt: new Date() }
            : role
        ),
        isLoading: false,
      }));
    }, 500);
  },
  deleteRole: async (id) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set((state) => ({
        roles: state.roles.filter((role) => role.id !== id),
        isLoading: false,
      }));
    }, 500);
  },
  updateRolePermissions: async (roleId, module, permissions) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set((state) => ({
        roles: state.roles.map((role) =>
          role.id === roleId
            ? {
                ...role,
                permissions: {
                  ...role.permissions,
                  [module]: permissions,
                },
                updatedAt: new Date(),
              }
            : role
        ),
        isLoading: false,
      }));
    }, 500);
  },
}));
