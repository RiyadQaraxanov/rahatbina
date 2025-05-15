
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'super-admin' | 'admin' | 'operator' | 'inspector' | 'user';

export type Permission = 'view' | 'create' | 'update' | 'delete';

export type PermissionMap = {
  [module: string]: Permission[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: Role;
  isActive: boolean;
  lastLogin?: Date;
  permissions?: PermissionMap;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  hasPermission: (module: string, permission: Permission) => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: (user, token) => {
        set({ user, isAuthenticated: true, token });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, token: null });
      },
      updateUser: (updatedUser) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updatedUser } });
        }
      },
      hasPermission: (module, permission) => {
        const { user } = get();
        if (!user || !user.permissions) return false;
        return user.permissions[module]?.includes(permission) || false;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
