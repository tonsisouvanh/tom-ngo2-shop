import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminUser } from "./admin-types";

interface AdminAuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkPermission: (permission: string) => boolean;
}

// Mock admin users for demo
const mockAdminUsers: AdminUser[] = [
  {
    id: "1",
    email: "admin@stylehub.com",
    name: "Super Admin",
    role: "super_admin",
    avatar: "/placeholder.svg?height=40&width=40&text=SA",
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
    isActive: true,
  },
  {
    id: "2",
    email: "editor@stylehub.com",
    name: "Content Editor",
    role: "editor",
    avatar: "/placeholder.svg?height=40&width=40&text=CE",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
    isActive: true,
  },
];

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Mock authentication - in real app, this would call an API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = mockAdminUsers.find((u) => u.email === email);
        if (user && password === "admin123") {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      checkPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;

        const rolePermissions = {
          super_admin: ["*"],
          admin: [
            "products.*",
            "content.*",
            "media.*",
            "users.view",
            "settings.*",
          ],
          editor: ["products.view", "products.edit", "content.*", "media.*"],
          viewer: ["products.view", "content.view", "media.view"],
        };

        const permissions = rolePermissions[user.role] || [];
        return (
          permissions.includes("*") ||
          permissions.some(
            (p) =>
              p === permission ||
              (p.endsWith(".*") && permission.startsWith(p.slice(0, -1)))
          )
        );
      },
    }),
    {
      name: "admin-auth",
    }
  )
);

export const adminPermissions = {
  PRODUCTS_VIEW: "products.view",
  PRODUCTS_CREATE: "products.create",
  PRODUCTS_EDIT: "products.edit",
  PRODUCTS_DELETE: "products.delete",
  CONTENT_VIEW: "content.view",
  CONTENT_CREATE: "content.create",
  CONTENT_EDIT: "content.edit",
  CONTENT_DELETE: "content.delete",
  MEDIA_VIEW: "media.view",
  MEDIA_UPLOAD: "media.upload",
  MEDIA_DELETE: "media.delete",
  USERS_VIEW: "users.view",
  USERS_MANAGE: "users.manage",
  SETTINGS_VIEW: "settings.view",
  SETTINGS_EDIT: "settings.edit",
};
